if [ $# -eq 0 ]; then
    echo "인자가 없습니다. 스크립트를 호출할 때 인자를 전달해주세요."
    exit 1
elif [ $1 = "web" ]; then
    ssh -t dice "rm -rf html/www"
    scp -r ./html/www/* dice:~/html/www/
    ssh -t dice "chmod -R 755 ./html" 
    ssh -t dice "sh restart.sh nginx"
elif [ $1 = "admin" ]; then
    ssh -t dice "rm -rf html/admin"
    scp -r ./html/admin/* dice:~/html/admin/
    ssh -t dice "chmod -R 755 ./html" 
    ssh -t dice "sh restart.sh nginx"
elif [ $1 = "download" ]; then
    ssh -t dice "rm -rf html/download"
    scp -r ./html/download/* dice:~/html/download/
    ssh -t dice "chmod -R 755 ./html" 
    ssh -t dice "sh restart.sh nginx"
elif [ $1 = "all" ]; then
    ssh -t dice "rm -rf html/*"
    scp -r ./html/* dice:~/html/
    ssh -t dice "chmod -R 755 ./html" 
    ssh -t dice "sh restart.sh nginx"
else
    echo "인자가 잘못되었습니다."
    exit 1

fi