echo "PID Check..." 

CURRENT_PID=$(ps -ef | grep java | grep app* | awk '{print $2}') 

echo "Running PID: {$CURRENT_PID}" 

if [ -z $CURRENT_PID ] ; then 
   echo "Project is not running"
else
   kill -9 $CURRENT_PID 
   sleep 10 
fi 

echo "Deploy Project...." 
nohup java -jar ~/app.jar >> ~/app.log & 

echo $(pgrep -f app*)
echo "Done"