-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 14, 2023 at 12:42 PM
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
(12, 'umaidkhakwani92@gmail.com', '', '', 'Meptics', '', '2023-11-13', '13:04:17'),
(13, 'umaidkhakwani92@gmail.com', '', '', 'Meptics', '', '2023-11-13', '13:13:01'),
(14, 'umaidkhakwani92@gmail.com', '', '', 'Meptics', '', '2023-11-13', '17:20:45'),
(15, 'umaidkhakwani92@gmail.com', '', '', 'Meptics', '', '2023-11-14', '16:41:46');

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
  `tax_amount` int(11) NOT NULL,
  `tax_percentage` int(11) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `expenses`
--

INSERT INTO `expenses` (`ex_id`, `email`, `title`, `warehouse`, `company`, `retail`, `tax_amount`, `tax_percentage`, `date`, `time`) VALUES
(1, 'umaidkhakwani92@gmail.com', 'Electricity bill', 'warehouse 2', 'Meptics', '10000', 300, 3, '2023-11-13', '17:08:08'),
(2, 'umaidkhakwani92@gmail.com', 'water', 'warehouse 3', 'Meptics', '2500', 300, 12, '2023-11-13', '17:08:36');

-- --------------------------------------------------------

--
-- Table structure for table `pos_closing`
--

CREATE TABLE `pos_closing` (
  `pos_id` int(11) NOT NULL,
  `id` int(11) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `gst` text DEFAULT NULL,
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

INSERT INTO `pos_closing` (`pos_id`, `id`, `description`, `gst`, `company_name`, `total_amount`, `cost_price`, `user_paid`, `transaction`, `time`, `date`) VALUES
(1, 5, '454-dew(12),234rt4(12),', '454-dew(12),234rt4(12),', 'Meptics', 24192.00, 21600.00, 25000.00, 'Card', '17:20:45', '2023-11-13'),
(2, 4, 'f324y6(18),', 'f324y6(12),', 'Meptics', 2016000.00, 1800000.00, 2100000.00, 'Cash', '16:41:46', '2023-11-14');

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
-- Table structure for table `shopify_warehouse`
--

CREATE TABLE `shopify_warehouse` (
  `sw_id` int(11) NOT NULL,
  `id` int(11) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `store_name` varchar(255) NOT NULL,
  `api_key` varchar(255) NOT NULL,
  `token_pass` varchar(255) NOT NULL,
  `company` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `shopify_warehouse`
--

INSERT INTO `shopify_warehouse` (`sw_id`, `id`, `title`, `email`, `store_name`, `api_key`, `token_pass`, `company`, `date`, `time`) VALUES
(1, 11, 'Nexos shopify', 'umaidkhakwani92@gmail.com', 'nexos-9102', '8deb91f0ff4f16a37ba275db50dc4121', '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', 'Meptics', '2023-11-13', '03:12:17'),
(2, 12, 'Dummy test store 001', 'umaidkhakwani92@gmail.com', 'dummy-test-store-001', '169f5d9abebdf0dfac8ddad34aa6c5bd', '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', 'Meptics', '2023-11-13', '03:14:28');

-- --------------------------------------------------------

--
-- Table structure for table `status`
--

CREATE TABLE `status` (
  `s_id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `warehouse` varchar(255) NOT NULL,
  `company` varchar(255) NOT NULL,
  `profit` int(11) NOT NULL,
  `state` varchar(2) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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

-- --------------------------------------------------------

--
-- Table structure for table `transfer`
--

CREATE TABLE `transfer` (
  `ts_id` int(11) NOT NULL,
  `id` int(11) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `company` varchar(255) NOT NULL,
  `warehouse_from` varchar(255) NOT NULL,
  `SKU` varchar(255) NOT NULL,
  `quantity_sent` int(11) DEFAULT NULL,
  `status_sent` varchar(255) NOT NULL,
  `f_time` time NOT NULL,
  `f_date` date NOT NULL,
  `warehouse_to` varchar(255) NOT NULL,
  `quantity_received` int(11) DEFAULT NULL,
  `status_received` varchar(255) NOT NULL,
  `d_time` time NOT NULL,
  `d_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transfer`
--

INSERT INTO `transfer` (`ts_id`, `id`, `email`, `company`, `warehouse_from`, `SKU`, `quantity_sent`, `status_sent`, `f_time`, `f_date`, `warehouse_to`, `quantity_received`, `status_received`, `d_time`, `d_date`) VALUES
(1, 37, 'umaidkhakwani92@gmail.com', 'Meptics', 'warehouse 1', '2eed3', 10, 'Sent', '13:12:06', '2023-11-13', 'POS 1', 10, 'Received', '13:12:06', '2023-11-13');

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
(10, 'umaidkhakwani92@gmail.com', 'POS 4', 'Hawksbay', 'Karachi', 'Pakistan', 'Woo-commerce', '0', 'Meptics', '2023-10-24', '12:59:01'),
(11, 'umaidkhakwani92@gmail.com', 'Nexos shopify', 'hawkbay', 'karachi', 'pakistan', 'Shopify', '0', 'Meptics', '2023-11-13', '03:12:17'),
(12, 'umaidkhakwani92@gmail.com', 'Dummy test store 001', 'johar town', 'lahore', 'pakistan', 'Shopify', '0', 'Meptics', '2023-11-13', '03:14:28'),
(13, 'umaidkhakwani92@gmail.com', 'POS 5', 'adade', 'treg', 'rhew', 'other', '0', 'Meptics', '2023-11-13', '10:40:11'),
(14, 'umaidkhakwani92@gmail.com', 'POS 6', 'wfjowi', 'jrgte', 'gjeo', 'other', '0', 'Meptics', '2023-11-13', '10:40:24');

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
(10, 'umaidkhakwani92@gmail.com', 'POS 4', 0),
(11, 'umaidkhakwani92@gmail.com', 'Nexos shopify', 0),
(12, 'umaidkhakwani92@gmail.com', 'Dummy test store 001', 0),
(13, 'umaidkhakwani92@gmail.com', 'POS 5', 0),
(14, 'umaidkhakwani92@gmail.com', 'POS 6', 0);

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
-- Dumping data for table `warehouse_product`
--

INSERT INTO `warehouse_product` (`id`, `email`, `company`, `warehouse`, `SKU`, `quantity`, `counter`) VALUES
(37, 'umaidkhakwani92@gmail.com', 'Meptics', 'warehouse 1', '123432', 218, 0),
(38, 'umaidkhakwani92@gmail.com', 'Meptics', 'warehouse 1', '2eed3', 220, 0),
(39, 'umaidkhakwani92@gmail.com', 'Meptics', 'warehouse 1', '32432', 676, 0),
(40, 'umaidkhakwani92@gmail.com', 'Meptics', 'warehouse 1', '32hjh-87', 469, 0),
(41, 'umaidkhakwani92@gmail.com', 'Meptics', 'warehouse 1', '47djejjj', 223, 0),
(42, 'umaidkhakwani92@gmail.com', 'Meptics', 'warehouse 1', '87686', 230, 0),
(43, 'umaidkhakwani92@gmail.com', 'Meptics', 'POS 5', 'dew-001', 230, 0),
(44, 'umaidkhakwani92@gmail.com', 'Meptics', 'POS 5', 'djjdue83', 230, 0),
(45, 'umaidkhakwani92@gmail.com', 'Meptics', 'POS 5', 'dw2', 23, 0),
(46, 'umaidkhakwani92@gmail.com', 'Meptics', 'POS 5', 'faniufhiu3', 230, 0),
(47, 'umaidkhakwani92@gmail.com', 'Meptics', 'POS 5', 'hte5y3', 230, 0),
(48, 'umaidkhakwani92@gmail.com', 'Meptics', 'POS 5', 'j84g398', 230, 0),
(49, 'umaidkhakwani92@gmail.com', 'Meptics', 'POS 6', '123432', 213, 0),
(50, 'umaidkhakwani92@gmail.com', 'Meptics', 'POS 6', '2eed3', 324, 0),
(51, 'umaidkhakwani92@gmail.com', 'Meptics', 'POS 6', '32432', 12, 0),
(52, 'umaidkhakwani92@gmail.com', 'Meptics', 'POS 6', '32hjh-87', 23, 0),
(53, 'umaidkhakwani92@gmail.com', 'Meptics', 'POS 6', '47djejjj', 343, 0),
(54, 'umaidkhakwani92@gmail.com', 'Meptics', 'POS 6', '87686', 21, 0),
(55, 'umaidkhakwani92@gmail.com', 'Meptics', 'POS 1', 'dew-001', 342, 0),
(56, 'umaidkhakwani92@gmail.com', 'Meptics', 'POS 1', 'djjdue83', 3, 0),
(57, 'umaidkhakwani92@gmail.com', 'Meptics', 'POS 1', 'dw2', 654, 0),
(58, 'umaidkhakwani92@gmail.com', 'Meptics', 'POS 1', 'faniufhiu3', 775, 0),
(59, 'umaidkhakwani92@gmail.com', 'Meptics', 'POS 1', 'hte5y3', 2, 0),
(60, 'umaidkhakwani92@gmail.com', 'Meptics', 'POS 1', 'j84g398', 124, 0),
(61, 'umaidkhakwani92@gmail.com', 'Meptics', 'POS 2', '123432', 202, 0),
(62, 'umaidkhakwani92@gmail.com', 'Meptics', 'POS 2', '2eed3', 619, 0),
(63, 'umaidkhakwani92@gmail.com', 'Meptics', 'POS 2', '32432', 123, 0),
(64, 'umaidkhakwani92@gmail.com', 'Meptics', 'POS 2', '32hjh-87', 76, 0),
(65, 'umaidkhakwani92@gmail.com', 'Meptics', 'POS 2', '47djejjj', 780, 0),
(66, 'umaidkhakwani92@gmail.com', 'Meptics', 'POS 2', '87686', 400, 0),
(67, 'umaidkhakwani92@gmail.com', 'Meptics', 'POS 2', 'dew-001', 130, 0),
(68, 'umaidkhakwani92@gmail.com', 'Meptics', 'POS 3', 'djjdue83', 250, 0),
(69, 'umaidkhakwani92@gmail.com', 'Meptics', 'POS 3', 'dw2', 652, 0),
(70, 'umaidkhakwani92@gmail.com', 'Meptics', 'POS 3', 'faniufhiu3', 29, 0),
(71, 'umaidkhakwani92@gmail.com', 'Meptics', 'POS 3', 'hte5y3', 461, 0),
(72, 'umaidkhakwani92@gmail.com', 'Meptics', 'POS 4', 'j84g398', 312, 0),
(73, 'umaidkhakwani92@gmail.com', '', 'POS 1', '2eed3', 10, 0);

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
  ADD PRIMARY KEY (`SKU`,`company`);

--
-- Indexes for table `shopify_warehouse`
--
ALTER TABLE `shopify_warehouse`
  ADD PRIMARY KEY (`sw_id`),
  ADD KEY `email` (`email`),
  ADD KEY `id` (`id`);

--
-- Indexes for table `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`s_id`),
  ADD KEY `email` (`email`);

--
-- Indexes for table `supplier`
--
ALTER TABLE `supplier`
  ADD PRIMARY KEY (`id`),
  ADD KEY `admin_email` (`admin_email`);

--
-- Indexes for table `transfer`
--
ALTER TABLE `transfer`
  ADD PRIMARY KEY (`ts_id`),
  ADD KEY `id` (`id`);

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
  MODIFY `cus_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `expenses`
--
ALTER TABLE `expenses`
  MODIFY `ex_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `pos_closing`
--
ALTER TABLE `pos_closing`
  MODIFY `pos_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `shopify_warehouse`
--
ALTER TABLE `shopify_warehouse`
  MODIFY `sw_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `status`
--
ALTER TABLE `status`
  MODIFY `s_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `supplier`
--
ALTER TABLE `supplier`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `transfer`
--
ALTER TABLE `transfer`
  MODIFY `ts_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `warehouse`
--
ALTER TABLE `warehouse`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `warehouse_counter`
--
ALTER TABLE `warehouse_counter`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `warehouse_product`
--
ALTER TABLE `warehouse_product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;

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
-- Constraints for table `shopify_warehouse`
--
ALTER TABLE `shopify_warehouse`
  ADD CONSTRAINT `shopify_warehouse_ibfk_1` FOREIGN KEY (`email`) REFERENCES `users` (`email`) ON DELETE CASCADE,
  ADD CONSTRAINT `shopify_warehouse_ibfk_2` FOREIGN KEY (`id`) REFERENCES `warehouse` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `status`
--
ALTER TABLE `status`
  ADD CONSTRAINT `status_ibfk_1` FOREIGN KEY (`email`) REFERENCES `users` (`email`) ON DELETE CASCADE;

--
-- Constraints for table `supplier`
--
ALTER TABLE `supplier`
  ADD CONSTRAINT `supplier_ibfk_1` FOREIGN KEY (`admin_email`) REFERENCES `users` (`email`) ON DELETE CASCADE;

--
-- Constraints for table `transfer`
--
ALTER TABLE `transfer`
  ADD CONSTRAINT `transfer_ibfk_1` FOREIGN KEY (`id`) REFERENCES `warehouse_product` (`id`) ON DELETE CASCADE;

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
