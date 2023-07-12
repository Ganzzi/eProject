# eProject - ShareSpace

T1.2208.A0 - eProject - Group 5
Batch no.: T1.2208.A0

CENTER NAME: ACE-HCMC-2-FPT

Project title: ShareSpace
Description: This is a social media web app that have 3 roles:

-   guest: signup new account
-   admin: manage user, post, chatroom
-   user: chat, post and many more cool features you'll want to explore :)

----------- Group 5 -----------

4 collaborators:

         Nguyen Trinh Duy An

         Pham Thi My Thuy

         Nguyen Quang Hao

         Duong Thi Tuyet Mai

# Installation

To run this project locally, please follow these steps:

1.  `git clone https://github.com/Ganzzi/eProject.git `
2.  `cd eProject/react`
3.  change .env.example to .env
4.  `npm install `
5.  `npm run dev `
6.  open new terminal in eProject folder
7.  `npm install `
8.  `composer install`
9.  `composer update `
10. rename .env.example to .env
11. `php artisan key:generate `
12. set database credentials in .env file: sharespace
13. `php artisan serve `
14. open phpmyadmin (XAMPP) and create new database name: socialmediadb2
15. Run these commands:

```
php artisan migrate:reset
php artisan migrate --force
php artisan db:seed
```

16. login with user role: - email: user1@mail.com - password: user123
17. login with admin role: - email: admin@mail.com - password: admin123

---

Thank you for spending your time to look at our work.
