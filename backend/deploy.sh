echo "PID Check..." 

CURRENT_PID=$(ps -ef | grep java | grep spring* | awk '{print $2}')

echo "Running PID: {$CURRENT_PID}" 

if [[ -z $CURRENT_PID ]] ; then
   echo "Project is not running"
else
   echo "Project is running"
   sudo kill -9 $CURRENT_PID
   sleep 10 
fi 

echo "Deploy Project...." 
sudo nohup java -jar /home/ubuntu/spring.jar >> /home/ubuntu/spring.log &

echo $(pgrep -f spring*)
echo "Done"