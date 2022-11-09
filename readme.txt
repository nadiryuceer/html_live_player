lUsage: sudo bash ffmpeg.sh "input" "path" "filename"

input: source of the incoming stream
path: the path which the video files and manifest will be put in(inside $(pwd)/video/
	if you don't want to choose anything for this option, put "";
filename: name of the manifest which will be created

Example usage:
sudo bash ffmpeg.sh /dev/video0 newone/ out.mpd
