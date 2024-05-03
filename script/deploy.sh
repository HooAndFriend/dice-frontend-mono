if [ $# -eq 0 ]; then
    echo "인자가 없습니다. 스크립트를 호출할 때 인자를 전달해주세요."
    exit 1
elif [ $1 = "web" ]; then
    ssh -t dice "rm -rf html/www"
    scp -r ./html/www/* dice:~/html/www/
    ssh -t dice "chmod -R 755 ./html" 
    ssh -t dice "sh restart.sh nginx"
    curl --location "https://api.hi-dice.com/api/slack/v1/slack" --header "Content-Type:application/json" --data '{"name":"FRONTEND:WEB","code":"MAS","message":"FRONTEND:WEB 배포가 완료되었습니다."}'
elif [ $1 = "admin" ]; then
    ssh -t dice "rm -rf html/admin"
    scp -r ./html/admin/* dice:~/html/admin/
    ssh -t dice "chmod -R 755 ./html" 
    ssh -t dice "sh restart.sh nginx"
    curl --location "https://api.hi-dice.com/api/slack/v1/slack" --header "Content-Type:application/json" --data '{"name":"FRONTEND:ADMIN","code":"MAS","message":"FRONTEND:ADMIN 배포가 완료되었습니다."}'
elif [ $1 = "download" ]; then
    ssh -t dice "rm -rf html/download"
    scp -r ./html/download/* dice:~/html/download/
    ssh -t dice "chmod -R 755 ./html" 
    ssh -t dice "sh restart.sh nginx"
    curl --location "https://api.hi-dice.com/api/slack/v1/slack" --header "Content-Type:application/json" --data '{"name":"FRONTEND:DOWNLOAD","code":"MAS","message":"FRONTEND:DOWNLOAD 배포가 완료되었습니다."}'
elif [ $1 = "all" ]; then
    ssh -t dice "rm -rf html/*"
    scp -r ./html/* dice:~/html/
    ssh -t dice "chmod -R 755 ./html" 
    ssh -t dice "sh restart.sh nginx"
    curl --location "https://api.hi-dice.com/api/slack/v1/slack" --header "Content-Type:application/json" --data '{"name":"FRONTEND:ALL","code":"MAS","message":"FRONTEND:ALL 배포가 완료되었습니다."}'
else
    echo "인자가 잘못되었습니다."
    exit 1

fi