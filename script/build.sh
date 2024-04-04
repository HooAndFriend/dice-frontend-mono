pnpm build

rm -rf html
mkdir html
cp -r ./apps/admin/dist ./html/admin/
cp -r ./apps/download/dist ./html/download/
cp -r ./apps/web/dist ./html/www/