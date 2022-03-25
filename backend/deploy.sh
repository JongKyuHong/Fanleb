PROC=`ps aux | grep app`
if [[ $PROC == *"app"* ]]; then
    echo "Process is running."
    sudo kill -15 `ps -ef | grep app | grep -v grep | awk '{print $2}'`
else
    echo "Process is not running."
fi

nohup java -jar -Du=app /home/ubuntu/app.jar &