sudo mkdir -p video/$2;
sudo ffmpeg -f v4l2 -i $1 -f alsa -i hw:0 -profile:v high -pix_fmt yuv420p -g 20 -level:v 4.1 -preset ultrafast -tune zerolatency -vcodec libx264 -vsync 0 -b:v 900k -s 640x360 -acodec aac -strict -2 -ac 2 -ab 32k -ar 44100 -f dash $(pwd)/video/$2$3
