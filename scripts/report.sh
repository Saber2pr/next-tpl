# by saber2pr

# 汇报人
report_username=saber2pr

# 需要生成汇报的项目目录和对应项目名
projects=(
/d/workspace/git/_next-tpl
# /d/workspace/git/admin
)
names=(
前端展示
# 后台管理
)

# 需要过滤的commit
filter="[a-z]"

# 以下所有配置不建议更改
# 文件导出路径
report_dir=$(cd "$(dirname "$0")"; pwd)
report_day=${report_dir}/$report_username的$(date +'%Y-%m-%d')日报.txt
report_week=${report_dir}/$report_username的$(date +'%Y第%W')周报.txt
report_month=${report_dir}/$report_username的$(date +"%Y-%m")月报.txt

# 汇报标题
echo $(date +'%Y-%m-%d')日报 $report_username > $report_day
echo $(date +'%Y第%W')周报 $report_username > $report_week
echo $(date +"%Y-%m")月报 $report_username > $report_month

i=0
day_i=0
week_i=0
month_i=0
for item in ${projects[*]}
do
  cd $item
  report_day_content="$(git log master --reverse --pretty=format:"%cd %s" --since="date '+%Y-%m-%d 00:00:00'" --date=format:'%H:%M:%S' --grep="$filter" --invert-grep --extended-regexp)";
  report_week_content="$(git log master --reverse --pretty=format:"%cd %s" --since="date -d 'last monday' +%Y%m%d" --date=format:'%Y-%m-%d %H:%M:%S' --grep="$filter" --invert-grep --extended-regexp)";
  report_month_content="$(git log master --reverse --pretty=format:"%cd %s" --since="date '+%Y-%m-01 00:00:00'" --date=format:'%Y-%m-%d %H:%M:%S' --grep="$filter" --invert-grep --extended-regexp)";
  if [ ${#report_day_content} -gt 0 ];then
  let day_i++
  echo -e "\n$day_i. ${names[$i]}\n$report_day_content" >> $report_day
  fi
  if [ ${#report_week_content} -gt 0 ];then
  let week_i++
  echo -e "\n$week_i. ${names[$i]}\n$report_week_content" >> $report_week
  fi
  if [ ${#report_month_content} -gt 0 ];then
  let month_i++
  echo -e "\n$month_i. ${names[$i]}\n$report_month_content" >> $report_month
  fi
  let i++
done

echo $report_day
echo $report_week
echo $report_month