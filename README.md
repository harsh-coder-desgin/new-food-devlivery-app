# 🍽️ Food Delivery Web App

A modern food delivery platform supporting three distinct user roles: **Restaurant Owners**, **Customers**, and **Delivery Partners**.

**🔗 Live Demo**: [Visit the App](https://new-food-devlivery-app.vercel.app)

---

## 🧰 Tech Stack

- **Framework**: Next.js
- **Styling**: Tailwind CSS
- **Database**: MongoDB
- **Hosting**: Vercel

---

## 👥 User Roles & Features

### 🧑‍🍳 Restaurant Dashboard
- ➕ Add / ✏️ Edit / 🗑️ Delete Food Items
- 📊 Dashboard overview of menu & orders

### 👤 Customer Dashboard
- 🍽️ Browse and filter restaurants
- 🛒 Add items to cart, place orders
- 💳 Billing & order summary
- 🚚 Track order status in real-time

### 🚚 Delivery Partner Dashboard
- 📋 View assigned deliveries
- ✅ Mark orders as delivered

---

## 🔐 Authentication

- 🔐 Sign Up & Login for each role
- 📦 Role-based dashboard redirection
- 🔄 Local storage used for auth simulation (no server-side auth yet)

---

## 💾 Data Storage

- 🧾 All data is stored using **MongoDB**
- 📤 Used directly inside Next.js components (no backend APIs)
- 🗂️ Collections: Users, Foods, Orders

---

## 📸 Screenshots

- Home Page – Restaurant Listings
 
  <img width="1918" height="903" alt="Screenshot 2025-07-17 190055" src="https://github.com/user-attachments/assets/929019f5-040e-44b8-bcf9-a078a155720c" />
 ---
- Restaurant Dashboard – Menu Management
  
   <img width="1918" height="902" alt="Screenshot 2025-07-17 190135" src="https://github.com/user-attachments/assets/a1dec83d-6481-4c7b-9c09-c63c17a3ab88" />
---
- Customer Dashboard – Cart & Orders
  
   <img width="1918" height="901" alt="Screenshot 2025-07-17 190605" src="https://github.com/user-attachments/assets/94559ec7-d832-44b4-bf12-2b0f0b623401" />
---
- Delivery Dashboard – Order Fulfillment
  
  <img width="1897" height="885" alt="Screenshot 2025-07-17 190714" src="https://github.com/user-attachments/assets/b224edde-f7d5-49e8-9a90-71ed92fd09a7" />
---

## 📁 Folder Structure (Simplified)

- src/
  - app/
    - _components/
      - AddFoodItem.js
      - CustomerHeader.js
      - DeliveryHeader.js
      - FoodCard.js
      - Footer.js
      - RestaurantsHeader.js
      - RestaurantLogin.js
      - RestaurantSignup.js
      - UserLogin.js
      - UserSignup.js

    - api/
      - customer/
        - route.js
        - [id]/route.js
        - locations/route.js

      - deliverypartners/
        - [city]/route.js
        - login/route.js
        - signup/route.js
        - status/
          - [id]/route.js
        - orders/
          - [id]/route.js

      - order/
        - route.js

      - restaurant/
        - route.js
        - food/
          - route.js
          - [id]/route.js
          - edit/
            - [id]/route.js

      - user/
        - route.js
        - login/route.js

    - cart/
      - page.js

    - deliverydashboard/
      - page.js

    - deliverypartner/
      - page.js

    - explore/
      - [name]/page.js

    - myprofile/
      - page.js

    - order/
      - page.js

    - orderstatus/
      - page.js
      - [id]/page.js

    - restaurants/
      - page.js
      - dashboard/
        - page.js
        - [id]/page.js

    - user-auth/
      - page.js

  - lib/
    - db.js
    - model/
      - DeliveryPartner.js
      - Food.js
      - Order.js
      - Restaurant.js
      - User.js


---

## 🧑‍💻 Author

Made by [Harsh Patel](https://github.com/harsh-coder-desgin)

📫 Reach me on [LinkedIn](https://www.linkedin.com/in/harsh-patel-2b3405303/)  

---

## 📝 License

This project is licensed under the [MIT License](LICENSE).
EOF
