## Quiz

```
1. Assuming the system currently has three microservices: Customer API, Master Data API, and
Transaction Data API, there is a new feature that requires data from all three microservices to be
displayed in near real-time. The current technology stack includes REST APIs and an RDBMS
database. How would you design a new API for this feature?

Ans
- การทำแคชเก็บข้อมูล
- การทำ Services กลางที่เอาไว้เรียกแต่ละ mincroservices
- การทำ time out จัดการ api

2. Assuming the team has started planning a new project, the project manager asks you for a
performance test strategy plan for this release. How would you recommend proceeding to the project
manager?

Ans
- การวางแผนการโครงสร้างโปรเจ็ค ให้ง่ายมีประสิทธิภาพและง่ายเมื่อมีการปรับปรุงหรืออัพเดท
- การเขียนแต่ละฟังก์ชั่นโดยการใช้หลักการ BigO
- การทำ test case จากตัว code เพื่อตรวจสอบการใช้ทรัพยากรและข้อผิดพลาดรวมถึงประสิทธิภาพของ code 

3. Design and develop two APIs using NestJS and Postgres with the following specifications:
Ans
to run project
- docker-compose up -d
- ts-node seed-db.ts
- npm run start:dev
*****
find all with pagination
- GET http://localhost:3000/products?page=1&limit=10
find one by name (unique name)
- GET http://localhost:3000/products/search?name=Product&page=1&limit=4
create product 
- POST http://localhost:3000/products
- BODY
{
  "translations": [
    {
      "language": "en",
      "name": "English Product Nam22e",
      "description": "English Product Description"
    },
    {
      "language": "fr",
      "name": "Nom du produit en frança33is",
      "description": "Description du produit en français"
    }
  ]
}

```

## Additional Requirements:

```
Validation: ใช้ Tools ที่ใช้สำหรับตรวจสอบ เช่นตัวที่ใช้ในนี้จะเป็นตัว class-validator และตัวอื่นๆ

Database Design: เนื่องจากต้องทำให้รองรับหลายภาษา จึงดีไซน์ให้เก็บ Product 1 ก้อน แยกเป็น id (สามารถเพิ่มรายละเอียดส่วนอื่นๆได้ทีหลัง) และ Product Transation 1ก้อนเพื่อระบุว่าเป็น Product ตัวไหน และตัวนั้นจะมีชื่อแต่ภาษาว่าอะไร คำอธิบายแต่ละภาษาว่าอะไร เป็นต้น

Testing Strategy: ภายในโปรเจ็คจะทดสอบแบบยิง API เช็ค แต่สามารถเขียน unit case ได้ภายหลัง
```

