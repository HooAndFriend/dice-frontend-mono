if [ $# -eq 0 ]; then
    echo "인자가 없습니다. 스크립트를 호출할 때 인자를 전달해주세요."
    exit 1
elif [ $1 = "web" ]; then
    scp -r ./html/www/* dice:~/html/www/
    ssh -t dice "cd ~/dice && sh restart.sh nginx"
elif [ $1 = "admin" ]; then
    scp -r ./html/admin/* dice:~/html/admin/
    ssh -t dice "cd ~/dice && sh restart.sh nginx"
elif [ $1 = "admin" ]; then
    scp -r ./html/download/* dice:~/html/download/
    ssh -t dice "cd ~/dice && sh restart.sh nginx"
elif [ $1 = "all" ]; then
    scp -r ./html/* dice:~/html/
    ssh -t dice "cd ~/dice && sh restart.sh nginx"
else
    echo "인자가 잘못되었습니다."
    exit 1

fi