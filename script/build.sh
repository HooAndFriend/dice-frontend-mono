pnpm build

mkdir html
cp -r ./apps/web/dist ./html/www/
cp -r ./apps/admin/dist ./html/admin/
cp -r ./apps/download/dist ./html/download/