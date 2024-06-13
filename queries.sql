-- Multi-Table Query Practice

-- Display the ProductName and CategoryName for all products in the database. Shows 77 records.
select 
  p.ProductName, c.CategoryName 
from Product p 
join Category c 
on p.CategoryId = c.Id;

-- Display the order Id and shipper CompanyName for all orders placed before August 9 2012. Shows 429 records.
select 
  o.Id as OrderId, 
  s.CompanyName as ShipperCompanyName 
from [Order] o 
join Shipper s 
on o.ShipVia = s.Id 
where o.OrderDate < '2012-08-09';

-- Display the name and quantity of the products ordered in order with Id 10251. Sort by ProductName. Shows 3 records.
select p.ProductName, od.Quantity 
from Product p 
join OrderDetail od 
on p.Id = od.ProductId 
where od.OrderId = 10251 
order by p.ProductName;

-- Display the OrderID, Customer's Company Name and the employee's LastName for every order. All columns should be labeled clearly. Displays 16,789 records.
select 
  o.Id as OrderID, 
  c.CompanyName as CustomerCompanyName, 
  e.LastName as EmployeeLastName 
from [Order] o 
join Customer c 
on o.CustomerId = c.Id 
join Employee e 
on o.EmployeeId = e.Id;
