-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 24, 2023 at 10:19 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mep_store`
--

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `cus_id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `cus_email` varchar(255) NOT NULL,
  `company` varchar(255) NOT NULL,
  `phone` varchar(13) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`cus_id`, `email`, `name`, `cus_email`, `company`, `phone`, `date`, `time`) VALUES
(1, 'umaidkhakwani92@gmail.com', 'Umaid', 'umaid@gmail.com', 'Meptics', '+92 306786180', '2023-10-19', '13:04:31'),
(2, 'umaidkhakwani92@gmail.com', 'Abdullah', '', 'Meptics', '+923097568922', '2023-10-19', '13:06:02'),
(3, 'umaidkhakwani92@gmail.com', 'Zameer', '', 'Meptics', '+923097698922', '2023-10-19', '13:11:26'),
(4, 'umaidkhakwani92@gmail.com', 'zohair', '', 'Meptics', '+923097697712', '2023-10-19', '13:16:53'),
(5, 'umaidkhakwani92@gmail.com', 'Talha', '', 'Meptics', '+923126989685', '2023-10-19', '13:20:51'),
(6, 'umaidkhakwani92@gmail.com', 'Ahmad', '', 'Meptics', '+923225486667', '2023-10-19', '13:24:28'),
(7, 'umaidkhakwani92@gmail.com', 'Ahmad Gilani', '', 'Meptics', '+923225686667', '2023-10-19', '13:26:42'),
(8, 'umaidkhakwani92@gmail.com', 'Ahmad Gilanii', '', 'Meptics', '+923225686677', '2023-10-19', '13:28:13'),
(9, 'umaidkhakwani92@gmail.com', 'Hassan', '', 'Meptics', '+448374758843', '2023-10-19', '13:33:32'),
(10, 'umaidkhakwani92@gmail.com', 'Hassann', '', 'Meptics', '+448374758844', '2023-10-19', '13:34:55');

-- --------------------------------------------------------

--
-- Table structure for table `expenses`
--

CREATE TABLE `expenses` (
  `ex_id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `warehouse` varchar(255) NOT NULL,
  `company` varchar(255) NOT NULL,
  `retail` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `expenses`
--

INSERT INTO `expenses` (`ex_id`, `email`, `title`, `warehouse`, `company`, `retail`, `date`, `time`) VALUES
(1, 'umaidkhakwani92@gmail.com', 'Electricity Bill', 'warehouse 2', 'Meptics', '10000', '2023-10-17', '08:18:41'),
(2, 'umaidkhakwani92@gmail.com', 'Tea Bill', 'warehouse 3', 'Meptics', '1000', '2023-10-18', '11:05:45'),
(3, 'umaidkhakwani92@gmail.com', 'Chair', 'warehouse 1', 'Meptics', '1500', '2023-10-18', '11:15:55');

-- --------------------------------------------------------

--
-- Table structure for table `pos_closing`
--

CREATE TABLE `pos_closing` (
  `pos_id` int(11) NOT NULL,
  `id` int(11) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `company_name` varchar(255) DEFAULT NULL,
  `total_amount` decimal(13,2) DEFAULT NULL,
  `cost_price` decimal(13,2) DEFAULT NULL,
  `user_paid` decimal(13,2) DEFAULT NULL,
  `transaction` varchar(255) DEFAULT NULL,
  `time` time NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pos_closing`
--

INSERT INTO `pos_closing` (`pos_id`, `id`, `description`, `company_name`, `total_amount`, `cost_price`, `user_paid`, `transaction`, `time`, `date`) VALUES
(325, 4, 'uf6fguft6f(2),232663abc(2),', 'Meptics', 120736.00, 107800.00, 130000.00, 'Cash', '00:00:00', '2023-10-17'),
(326, 4, 'uf6fguft6f(5),232663abc(5),', 'Meptics', 301840.00, 269500.00, 310000.00, 'Cash', '00:00:00', '2023-10-17'),
(327, 4, '232663abc(1),', 'Meptics', 4368.00, 3900.00, 4500.00, 'Cash', '00:00:00', '2023-10-17'),
(328, 4, '232663abc(6),', 'Meptics', 26208.00, 23400.00, 26500.00, 'Cash', '00:00:00', '2023-10-17'),
(329, 4, '232663abc(3),', 'Meptics', 13104.00, 11700.00, 14000.00, 'Cash', '00:00:00', '2023-10-17'),
(330, 4, 'uf6fguft6f(16),232663abc(14),', 'Meptics', 957152.00, 854600.00, 960000.00, 'Cash', '00:00:00', '2023-10-17'),
(331, 4, 'uf6fguft6f(16),232663abc(14),', 'Meptics', 957152.00, 854600.00, 960000.00, 'Cash', '00:00:00', '2023-10-17'),
(332, 4, 'uf6fguft6f(11),232663abc(11),', 'Meptics', 664477.00, 592900.00, 670000.00, 'Cash', '00:00:00', '2023-10-17'),
(333, 4, 'uf6fguft6f(11),232663abc(11),', 'Meptics', 664048.00, 592900.00, 677000.00, 'Cash', '00:00:00', '2023-10-17'),
(334, 4, '232663abc(2),uf6fguft6f(2),', 'Meptics', 120736.00, 107800.00, 125000.00, 'Cash', '00:00:00', '2023-10-17'),
(335, 2, '232663abc(12),uf6fguft6f(12),', 'Meptics', 724416.00, 646800.00, 730000.00, 'Cash', '00:00:00', '2023-10-17'),
(336, 1, '232663abc(5),3ii5kkk-g(5),', 'Meptics', 77840.00, 69500.00, 78000.00, 'Cash', '00:00:00', '2023-10-17'),
(337, 2, '232663abc(1),uf6fguft6f(2),', 'Meptics', 116368.00, 103900.00, 116500.00, 'Cash', '00:00:00', '2023-10-17'),
(338, 5, '454-dew(25),uf6fguft6f(2),', 'Meptics', 120400.00, 107500.00, 125000.00, 'Card', '04:55:44', '2023-10-17'),
(340, 1, '234rt4(2),232663abc(2),3ii5kkk-g(2),dew-code-001(2),41524fe(2),d3f3(2),u3h83(2),f324y6(2),nfweidf43(2),', 'Meptics', 315504.00, 281700.00, 320000.00, 'Card', '13:17:45', '2023-10-18'),
(341, 1, 'f324y6(2),', 'Meptics', 224000.00, 200000.00, 230000.00, 'Card', '20:32:23', '2023-10-18'),
(342, 1, 'dew-code-001(2),3ii5kkk-g(2),', 'Meptics', 22512.00, 20100.00, 23000.00, 'Card', '12:46:39', '2023-10-19'),
(343, 1, '234rt4(2),', 'Meptics', 3360.00, 3000.00, 3400.00, 'Card', '12:53:50', '2023-10-19'),
(344, 1, '234rt4(4),', 'Meptics', 6720.00, 6000.00, 6800.00, 'Card', '12:58:57', '2023-10-19'),
(345, 1, '234rt4(5),', 'Meptics', 8400.00, 7500.00, 8500.00, 'Card', '13:04:31', '2023-10-19'),
(346, 1, '232663abc(1),', 'Meptics', 4368.00, 3900.00, 4400.00, 'Card', '13:06:02', '2023-10-19'),
(347, 1, '232663abc(1),', 'Meptics', 4368.00, 3900.00, 4400.00, 'Card', '13:11:26', '2023-10-19'),
(348, 1, '232663abc(1),', 'Meptics', 3900.00, 3900.00, 3900.00, 'Card', '13:11:41', '2023-10-19'),
(349, 1, '3ii5kkk-g(12),', 'Meptics', 134400.00, 120000.00, 140000.00, 'Card', '13:12:31', '2023-10-19'),
(350, 1, '3ii5kkk-g(12),', 'Meptics', 134400.00, 120000.00, 140000.00, 'Card', '13:13:21', '2023-10-19'),
(351, 1, '232663abc(2),', 'Meptics', 8736.00, 7800.00, 8800.00, 'Card', '13:14:28', '2023-10-19'),
(352, 1, '232663abc(2),', 'Meptics', 8736.00, 7800.00, 8800.00, 'Card', '13:16:53', '2023-10-19'),
(353, 1, 'f324y6(2),', 'Meptics', 224000.00, 200000.00, 230000.00, 'Card', '13:20:51', '2023-10-19'),
(354, 1, 'u3h83(12),', 'Meptics', 134400.00, 120000.00, 140000.00, 'Card', '13:24:28', '2023-10-19'),
(355, 1, 'f324y6(1),', 'Meptics', 112000.00, 100000.00, 120000.00, 'Card', '13:26:42', '2023-10-19'),
(356, 1, '234rt4(12),', 'Meptics', 20160.00, 18000.00, 21000.00, 'Card', '13:28:13', '2023-10-19'),
(357, 1, 'u3h83(12),', 'Meptics', 134400.00, 120000.00, 140000.00, 'Card', '13:33:32', '2023-10-19'),
(358, 1, 'u3h83(12),', 'Meptics', 134400.00, 120000.00, 140000.00, 'Card', '13:34:55', '2023-10-19'),
(359, 1, 'f324y6(1),', 'Meptics', 112000.00, 100000.00, 112000.00, 'Card', '13:50:38', '2023-10-19');

-- --------------------------------------------------------

--
-- Table structure for table `product_list`
--

CREATE TABLE `product_list` (
  `SKU` varchar(255) NOT NULL,
  `company` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `picture_url` varchar(255) DEFAULT NULL,
  `cost_price` decimal(10,2) DEFAULT NULL,
  `retail_price` decimal(10,2) DEFAULT NULL,
  `weight` decimal(10,2) DEFAULT NULL,
  `size` varchar(255) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  `barcode` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_list`
--

INSERT INTO `product_list` (`SKU`, `company`, `title`, `description`, `picture_url`, `cost_price`, `retail_price`, `weight`, `size`, `color`, `barcode`) VALUES
('123432', 'Meptics', 'Gloves', 'Super cools', 'bdvdbuabb', 20000.00, 300.00, 23.00, 'sdf', 'green', '454-dew'),
('2eed3', 'Meptics', 'Coke', 'Super cools', 'bdvdbuabb', 200.00, 1500.00, 230.00, 'large', 'green', '234rt4'),
('32432', 'Meptics', 'Samsung S21 ultra', 'gdfs', 'df', 50000.00, 3900.00, 69.00, 'small', 'blacks', '232663abc'),
('32hjh-87', 'Meptics', 'Samsung A33', 'Super cool', 'df', 89000.00, 50000.00, 469.00, 'small', 'Blue', 'uf6fguft6f'),
('47djejjj', 'Meptics', 'Airpods', 'Super cools', 'bdvdbuabb', 5000.00, 10000.00, 230.00, 'normal', 'green', '3ii5kkk-g'),
('87686', 'Meptics', 'Redmi', 'gdfs', 'fdsa', 62000.00, 0.00, 230.00, 'small', 'Red', '5321fda'),
('dew-001', 'Meptics', 'Mountain Dew', 'Super cool', 'bdvdbuabb', 10.00, 50.00, 230.00, 'normal', 'green', 'dew-code-001'),
('djjdue83', 'Meptics', 'Gloves', 'Super cools', 'bdvdbuabb', 6200.00, 10000.00, 230.00, 'normal', 'Red', '41524fe'),
('dw2', 'Meptics', 'Coke', 'Super cool', 'bdvdbuabb', 200.00, 1500.00, 23.00, 'small', 'black', 'd3f3'),
('faniufhiu3', 'Meptics', 'Nestle water', 'Super cools', 'image url', 5000.00, 10000.00, 230.00, 'normal', 'black', 'u3h83'),
('hte5y3', 'Meptics', 'LED', 'sadfdg', 'bdvdbuabb', 20000.00, 100000.00, 230.00, 'large', 'black', 'f324y6'),
('j84g398', 'Meptics', '7up', 'Super cool', 'ssde', 200.00, 3900.00, 230.00, 'large', 'Red', 'nfweidf43');

-- --------------------------------------------------------

--
-- Table structure for table `supplier`
--

CREATE TABLE `supplier` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `admin_email` varchar(255) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `company` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `supplier`
--

INSERT INTO `supplier` (`id`, `name`, `admin_email`, `phone_number`, `company`, `category`, `city`, `address`, `country`) VALUES
(3, 'Rashid', 'umaidkhakwani92@gmail.com', '03006564589', 'Meptics', 'steel', 'lahore', 'model town', 'pakistans'),
(4, 'Mushtaq', 'umaidkhakwani92@gmail.com', '03006564500', 'Meptics', 'Wool', 'lahore', 'dasfa', 'pakistanss');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `company` varchar(255) NOT NULL,
  `fname` varchar(255) NOT NULL,
  `lname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `userToken` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `company`, `fname`, `lname`, `email`, `password`, `userToken`) VALUES
(1, 'Meptics', 'Umaid', 'Khan', 'umaidkhakwani92@gmail.com', '12345678', '786'),
(3, 'Meptics', 'Rao', 'Hassan', 'hassan@gmail.com', '12345678', '0111111111111'),
(4, 'Meptics', 'Zohair ', 'Baig', 'zohair@gmail.com', '12345678', '0001000000100'),
(5, 'Meptics', 'rizwan', 'khalid', 'rk@gmail.com', '12345678', '0000100001100'),
(7, 'Meptics', 'fasih', 'khan', 'fasih@gmail.com', '12345678', '00001000'),
(8, 'Meptics', 'Zameer', 'Khalid', 'zameer@gmail.com', '12345678', '10000000');

-- --------------------------------------------------------

--
-- Table structure for table `warehouse`
--

CREATE TABLE `warehouse` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `association` varchar(255) NOT NULL,
  `role` varchar(2) NOT NULL,
  `company` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `warehouse`
--

INSERT INTO `warehouse` (`id`, `email`, `title`, `city`, `address`, `country`, `association`, `role`, `company`, `date`, `time`) VALUES
(1, 'umaidkhakwani92@gmail.com', 'warehouse 1', 'adsfd', 'dafs', 'fsf', 'other', '1', 'Meptics', '2023-09-22', '16:34:42'),
(2, 'umaidkhakwani92@gmail.com', 'warehouse 2', 'retr', 'erw', 'rwe', 'other', '0', 'Meptics', '2023-09-22', '16:38:42'),
(3, 'umaidkhakwani92@gmail.com', 'warehouse 3', 'ase', 'grehe', 'htekhetje', 'other', '0', 'Meptics', '2023-09-22', '16:39:55'),
(4, 'umaidkhakwani92@gmail.com', 'POS 1', 'Johar Town', 'lahore', 'Pakistan', 'Woo-commerce', '0', 'Meptics', '2023-10-05', '13:18:51'),
(5, 'umaidkhakwani92@gmail.com', 'POS 2', 'heywood', 'Manchester', 'England', 'other', '0', 'Meptics', '2023-10-05', '13:23:13'),
(6, 'umaidkhakwani92@gmail.com', 'POS 3', 'fewweg', 'gwgwg', 'gwegew', 'other', '0', 'Meptics', '2023-10-10', '15:29:28'),
(8, 'umaidkhakwani92@gmail.com', 'warehouse 4', 'DHA ', 'Lahore', 'Pakistan', 'other', '0', 'Meptics', '2023-10-24', '12:38:03'),
(10, 'umaidkhakwani92@gmail.com', 'POS 4', 'Hawksbay', 'Karachi', 'Pakistan', 'Woo-commerce', '0', 'Meptics', '2023-10-24', '12:59:01');

-- --------------------------------------------------------

--
-- Table structure for table `warehouse_counter`
--

CREATE TABLE `warehouse_counter` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `warehouse` varchar(255) NOT NULL,
  `counter` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `warehouse_counter`
--

INSERT INTO `warehouse_counter` (`id`, `email`, `warehouse`, `counter`) VALUES
(10, 'umaidkhakwani92@gmail.com', 'POS 4', 0);

-- --------------------------------------------------------

--
-- Table structure for table `warehouse_product`
--

CREATE TABLE `warehouse_product` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `company` varchar(255) NOT NULL,
  `warehouse` varchar(255) NOT NULL,
  `SKU` varchar(255) NOT NULL,
  `quantity` int(11) DEFAULT NULL,
  `counter` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`cus_id`),
  ADD KEY `email` (`email`);

--
-- Indexes for table `expenses`
--
ALTER TABLE `expenses`
  ADD PRIMARY KEY (`ex_id`),
  ADD KEY `email` (`email`);

--
-- Indexes for table `pos_closing`
--
ALTER TABLE `pos_closing`
  ADD PRIMARY KEY (`pos_id`),
  ADD KEY `id` (`id`);

--
-- Indexes for table `product_list`
--
ALTER TABLE `product_list`
  ADD PRIMARY KEY (`SKU`,`company`) USING BTREE;

--
-- Indexes for table `supplier`
--
ALTER TABLE `supplier`
  ADD PRIMARY KEY (`id`),
  ADD KEY `admin_email` (`admin_email`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `warehouse`
--
ALTER TABLE `warehouse`
  ADD PRIMARY KEY (`id`),
  ADD KEY `email` (`email`);

--
-- Indexes for table `warehouse_counter`
--
ALTER TABLE `warehouse_counter`
  ADD PRIMARY KEY (`id`),
  ADD KEY `email` (`email`);

--
-- Indexes for table `warehouse_product`
--
ALTER TABLE `warehouse_product`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`,`warehouse`,`SKU`),
  ADD KEY `SKU` (`SKU`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `cus_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `expenses`
--
ALTER TABLE `expenses`
  MODIFY `ex_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `pos_closing`
--
ALTER TABLE `pos_closing`
  MODIFY `pos_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=360;

--
-- AUTO_INCREMENT for table `supplier`
--
ALTER TABLE `supplier`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `warehouse`
--
ALTER TABLE `warehouse`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `warehouse_counter`
--
ALTER TABLE `warehouse_counter`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `warehouse_product`
--
ALTER TABLE `warehouse_product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `customers`
--
ALTER TABLE `customers`
  ADD CONSTRAINT `customers_ibfk_1` FOREIGN KEY (`email`) REFERENCES `users` (`email`) ON DELETE CASCADE;

--
-- Constraints for table `expenses`
--
ALTER TABLE `expenses`
  ADD CONSTRAINT `expenses_ibfk_1` FOREIGN KEY (`email`) REFERENCES `users` (`email`) ON DELETE CASCADE;

--
-- Constraints for table `pos_closing`
--
ALTER TABLE `pos_closing`
  ADD CONSTRAINT `pos_closing_ibfk_1` FOREIGN KEY (`id`) REFERENCES `warehouse` (`id`);

--
-- Constraints for table `supplier`
--
ALTER TABLE `supplier`
  ADD CONSTRAINT `supplier_ibfk_1` FOREIGN KEY (`admin_email`) REFERENCES `users` (`email`) ON DELETE CASCADE;

--
-- Constraints for table `warehouse`
--
ALTER TABLE `warehouse`
  ADD CONSTRAINT `warehouse_ibfk_1` FOREIGN KEY (`email`) REFERENCES `users` (`email`) ON DELETE CASCADE;

--
-- Constraints for table `warehouse_counter`
--
ALTER TABLE `warehouse_counter`
  ADD CONSTRAINT `warehouse_counter_ibfk_1` FOREIGN KEY (`email`) REFERENCES `warehouse` (`email`) ON DELETE CASCADE;

--
-- Constraints for table `warehouse_product`
--
ALTER TABLE `warehouse_product`
  ADD CONSTRAINT `warehouse_product_ibfk_1` FOREIGN KEY (`email`) REFERENCES `warehouse` (`email`) ON DELETE CASCADE,
  ADD CONSTRAINT `warehouse_product_ibfk_2` FOREIGN KEY (`SKU`) REFERENCES `product_list` (`SKU`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
