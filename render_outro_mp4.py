import ctypes
import os
import subprocess
import math
import shutil

# Load Cairo
cairo = ctypes.CDLL("/opt/homebrew/lib/libcairo.dylib")

# Cairo prototypes
cairo.cairo_image_surface_create.restype = ctypes.c_void_p
cairo.cairo_image_surface_create.argtypes = [ctypes.c_int, ctypes.c_int, ctypes.c_int]

cairo.cairo_image_surface_create_from_png.restype = ctypes.c_void_p
cairo.cairo_image_surface_create_from_png.argtypes = [ctypes.c_char_p]

cairo.cairo_create.restype = ctypes.c_void_p
cairo.cairo_create.argtypes = [ctypes.c_void_p]

cairo.cairo_set_source_rgb.argtypes = [ctypes.c_void_p, ctypes.c_double, ctypes.c_double, ctypes.c_double]
cairo.cairo_set_source_rgba.argtypes = [ctypes.c_void_p, ctypes.c_double, ctypes.c_double, ctypes.c_double, ctypes.c_double]
cairo.cairo_set_source_surface.argtypes = [ctypes.c_void_p, ctypes.c_void_p, ctypes.c_double, ctypes.c_double]

cairo.cairo_paint.argtypes = [ctypes.c_void_p]
cairo.cairo_paint_with_alpha.argtypes = [ctypes.c_void_p, ctypes.c_double]
cairo.cairo_fill.argtypes = [ctypes.c_void_p]
cairo.cairo_rectangle.argtypes = [ctypes.c_void_p, ctypes.c_double, ctypes.c_double, ctypes.c_double, ctypes.c_double]
cairo.cairo_clip.argtypes = [ctypes.c_void_p]
cairo.cairo_save.argtypes = [ctypes.c_void_p]
cairo.cairo_restore.argtypes = [ctypes.c_void_p]
cairo.cairo_scale.argtypes = [ctypes.c_void_p, ctypes.c_double, ctypes.c_double]

cairo.cairo_image_surface_get_data.restype = ctypes.POINTER(ctypes.c_ubyte)
cairo.cairo_image_surface_get_data.argtypes = [ctypes.c_void_p]
cairo.cairo_image_surface_get_width.restype = ctypes.c_int
cairo.cairo_image_surface_get_width.argtypes = [ctypes.c_void_p]
cairo.cairo_image_surface_get_height.restype = ctypes.c_int
cairo.cairo_image_surface_get_height.argtypes = [ctypes.c_void_p]
cairo.cairo_destroy.argtypes = [ctypes.c_void_p]
cairo.cairo_surface_destroy.argtypes = [ctypes.c_void_p]
cairo.cairo_surface_flush.argtypes = [ctypes.c_void_p]
cairo.cairo_surface_mark_dirty.argtypes = [ctypes.c_void_p]

def cubic_bezier_logo(t):
    t = max(0.0, min(1.0, t))
    ts = t * t
    tc = ts * t
    return max(0.0, min(1.0, 1.4 * tc - 2.4 * ts + 2.0 * t))

def cubic_bezier_line(t):
    t = max(0.0, min(1.0, t))
    return 4 * t * t * t if t < 0.5 else 1.0 - math.pow(-2 * t + 2, 3) / 2.0

def make_dark_logo_surface(orig_surf):
    w = cairo.cairo_image_surface_get_width(orig_surf)
    h = cairo.cairo_image_surface_get_height(orig_surf)
    dark_surf = cairo.cairo_image_surface_create(0, w, h)
    
    cairo.cairo_surface_flush(orig_surf)
    cairo.cairo_surface_flush(dark_surf)

    src_ptr = cairo.cairo_image_surface_get_data(orig_surf)
    dst_ptr = cairo.cairo_image_surface_get_data(dark_surf)
    
    total_bytes = w * h * 4
    for i in range(0, total_bytes, 4):
        b = src_ptr[i]
        g = src_ptr[i+1]
        r = src_ptr[i+2]
        a = src_ptr[i+3]
        
        if a > 0:
            alpha_f = a / 255.0
            if r > g + 25:
                # Oxblood red accent: #761313
                dst_ptr[i] = int(25 * alpha_f)   # B
                dst_ptr[i+1] = int(20 * alpha_f) # G
                dst_ptr[i+2] = int(140 * alpha_f)# R
                dst_ptr[i+3] = a
            else:
                # White / paper logo: #f5f4ef
                dst_ptr[i] = int(240 * alpha_f)  # B
                dst_ptr[i+1] = int(245 * alpha_f)# G
                dst_ptr[i+2] = int(248 * alpha_f)# R
                dst_ptr[i+3] = a
        else:
            dst_ptr[i] = 0
            dst_ptr[i+1] = 0
            dst_ptr[i+2] = 0
            dst_ptr[i+3] = 0
            
    cairo.cairo_surface_mark_dirty(dark_surf)
    return dark_surf

def render_outro_video(width, height, is_portrait, is_dark, output_path):
    theme_name = "Dark" if is_dark else "Paper"
    print(f"--> Rendering {width}x{height} {theme_name} MP4 (faster pacing) to {output_path}...")
    
    fps = 60
    duration = 2.2
    total_frames = int(fps * duration)
    
    orig_logo_surf = cairo.cairo_image_surface_create_from_png(b"src/assets/solid-studio-logo.png")
    if is_dark:
        logo_surf = make_dark_logo_surface(orig_logo_surf)
    else:
        logo_surf = orig_logo_surf
        
    orig_logo_w = 976.0
    orig_logo_h = 1024.0
    
    # Perfectly centered in viewport
    if is_portrait:
        logo_w = 420.0
        logo_h = logo_w * (orig_logo_h / orig_logo_w)
        line_gap = 48.0
        line_thickness = 2.0
        # Vertically center the unit (logo + gap + line)
        center_x = width / 2.0
        center_y = (height - line_gap) / 2.0
        line_y = center_y + logo_h / 2.0 + line_gap
        line_w = logo_w
        trans_offset = 26.0
    else:
        logo_w = 300.0
        logo_h = logo_w * (orig_logo_h / orig_logo_w)
        line_gap = 36.0
        line_thickness = 1.75
        center_x = width / 2.0
        center_y = (height - line_gap) / 2.0
        line_y = center_y + logo_h / 2.0 + line_gap
        line_w = logo_w
        trans_offset = 22.0

    line_x = center_x - line_w / 2.0

    ffmpeg_cmd = [
        "/opt/homebrew/bin/ffmpeg", "-y",
        "-f", "rawvideo",
        "-vcodec", "rawvideo",
        "-s", f"{width}x{height}",
        "-pix_fmt", "bgra",
        "-r", str(fps),
        "-i", "-",
        "-c:v", "libx264",
        "-preset", "slow",
        "-crf", "16",
        "-pix_fmt", "yuv420p",
        "-movflags", "+faststart",
        output_path
    ]

    proc = subprocess.Popen(ffmpeg_cmd, stdin=subprocess.PIPE, stderr=subprocess.PIPE)
    
    surf = cairo.cairo_image_surface_create(0, width, height)
    cr = cairo.cairo_create(surf)
    data_ptr = cairo.cairo_image_surface_get_data(surf)
    frame_size = width * height * 4

    for f in range(total_frames):
        t = f / float(fps)
        
        # 1. Background
        if is_dark:
            cairo.cairo_set_source_rgb(cr, 23/255.0, 22/255.0, 19/255.0)
        else:
            cairo.cairo_set_source_rgb(cr, 241/255.0, 239/255.0, 232/255.0)
        cairo.cairo_paint(cr)

        global_alpha = 1.0
        if t > 1.85:
            global_alpha = max(0.0, (duration - t) / 0.35)

        # 2. Logo Reveal (0.0s to 0.95s)
        t_logo = max(0.0, min(1.0, t / 0.95))
        p_logo = cubic_bezier_logo(t_logo)
        logo_trans_y = trans_offset * (1.0 - p_logo)
        logo_alpha = global_alpha * min(1.0, p_logo * 1.3)

        if logo_alpha > 0.005:
            cairo.cairo_save(cr)
            clip_h = logo_h * p_logo
            clip_y = (center_y - logo_h / 2.0) + (logo_h - clip_h) + logo_trans_y
            cairo.cairo_rectangle(cr, center_x - logo_w / 2.0 - 5.0, clip_y, logo_w + 10.0, clip_h + 10.0)
            cairo.cairo_clip(cr)

            scale_factor = logo_w / orig_logo_w
            cairo.cairo_save(cr)
            cairo.cairo_scale(cr, scale_factor, scale_factor)
            dest_orig_x = (center_x - logo_w / 2.0) / scale_factor
            dest_orig_y = (center_y - logo_h / 2.0 + logo_trans_y) / scale_factor
            cairo.cairo_set_source_surface(cr, logo_surf, dest_orig_x, dest_orig_y)
            cairo.cairo_paint_with_alpha(cr, logo_alpha)
            cairo.cairo_restore(cr)
            cairo.cairo_restore(cr)

        # 3. Base Line (starts at t=0.15s)
        base_line_alpha = global_alpha * max(0.0, min(1.0, (t - 0.15) / 0.30))
        if base_line_alpha > 0.005:
            if is_dark:
                cairo.cairo_set_source_rgba(cr, 60/255.0, 58/255.0, 52/255.0, base_line_alpha)
            else:
                cairo.cairo_set_source_rgba(cr, 203/255.0, 199/255.0, 188/255.0, base_line_alpha)
            cairo.cairo_rectangle(cr, line_x, line_y, line_w, line_thickness)
            cairo.cairo_fill(cr)

        # 4. Traveling Oxblood Line (0.35s to 1.45s)
        if 0.35 <= t <= 1.50:
            t_line = max(0.0, min(1.0, (t - 0.35) / 1.10))
            p_line = cubic_bezier_line(t_line)
            red_line_x = line_x + (p_line * 2.0 - 1.0) * line_w

            cairo.cairo_save(cr)
            cairo.cairo_rectangle(cr, line_x, line_y - 0.5, line_w, line_thickness + 1.0)
            cairo.cairo_clip(cr)

            if is_dark:
                cairo.cairo_set_source_rgba(cr, 158/255.0, 34/255.0, 40/255.0, global_alpha)
            else:
                cairo.cairo_set_source_rgba(cr, 112/255.0, 20/255.0, 25/255.0, global_alpha)
            cairo.cairo_rectangle(cr, red_line_x, line_y - 0.25, line_w, line_thickness + 0.5)
            cairo.cairo_fill(cr)
            cairo.cairo_restore(cr)

        frame_bytes = bytes(ctypes.string_at(data_ptr, frame_size))
        proc.stdin.write(frame_bytes)

    proc.stdin.close()
    proc.wait()

    cairo.cairo_destroy(cr)
    cairo.cairo_surface_destroy(surf)
    if is_dark:
        cairo.cairo_surface_destroy(logo_surf)
    cairo.cairo_surface_destroy(orig_logo_surf)

    # Also generate WebP
    webp_path = output_path.replace(".mp4", ".webp")
    subprocess.run([
        "/opt/homebrew/bin/ffmpeg", "-y",
        "-i", output_path,
        "-vcodec", "libwebp",
        "-filter:v", "fps=30",
        "-lossless", "0",
        "-q:v", "80",
        "-loop", "0",
        webp_path
    ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    file_size_mb = os.path.getsize(output_path) / (1024 * 1024)
    print(f"SUCCESS: Rendered {output_path} ({file_size_mb:.2f} MB)")

if __name__ == "__main__":
    os.makedirs("public/animations", exist_ok=True)
    
    # 1. 16:9 Landscape MP4 (Paper)
    render_outro_video(1920, 1080, False, False, "public/animations/solid-studio-outro-16x9.mp4")
    # 2. 9:16 Vertical MP4 (Paper)
    render_outro_video(1080, 1920, True, False, "public/animations/solid-studio-outro-9x16.mp4")
    
    # 3. 16:9 Landscape MP4 (Dark Ink)
    render_outro_video(1920, 1080, False, True, "public/animations/solid-studio-outro-16x9-dark.mp4")
    # 4. 9:16 Vertical MP4 (Dark Ink)
    render_outro_video(1080, 1920, True, True, "public/animations/solid-studio-outro-9x16-dark.mp4")

    # Copy to root directory
    shutil.copyfile("public/animations/solid-studio-outro-16x9.mp4", "solid-studio-outro-16x9.mp4")
    shutil.copyfile("public/animations/solid-studio-outro-9x16.mp4", "solid-studio-outro-9x16.mp4")
    shutil.copyfile("public/animations/solid-studio-outro-16x9-dark.mp4", "solid-studio-outro-16x9-dark.mp4")
    shutil.copyfile("public/animations/solid-studio-outro-9x16-dark.mp4", "solid-studio-outro-9x16-dark.mp4")
    print("All MP4 videos re-rendered without subtitle!")
