1.  `git clone https://github.com/Ganzzi/e-Project.git `
2.  `cd e-Project/react`
3.  change .env.example to .env
4.  `npm install `
5.  `npm run dev `
6.  open new terminal
7.  `npm install `
8.  `composer install`
9.  `composer update `
10. rename .env.example to .env
11. `php artisan key:generate `
12. set database credentials in .env file: socialmediadb2
13. `php artisan serve `
14. open phpmyadmin (XAMPP) and create new database name: socialmediadb2

15. `
    php artisan migrate:reset 
    php artisan migrate --force 
    php artisan db:seed   
    `
16. login with user role: - email: user1@mail.com - password: user123
17. login with admin role: - email: admin@mail.com - password: admin123
