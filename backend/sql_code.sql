

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `company` varchar(255) NOT NULL,
  `fname` varchar(255) NOT NULL,
  `lname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `userToken` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE `warehouse_counter` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `warehouse` varchar(255) NOT NULL,
  `counter` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE `warehouse_product` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `company` varchar(255) NOT NULL,
  `warehouse` varchar(255) NOT NULL,
  `SKU` varchar(255) NOT NULL,
  `quantity` int(11) DEFAULT NULL,
  `counter` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


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

CREATE TABLE `status` (
  `s_id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `warehouse` varchar(255) NOT NULL,
  `company` varchar(255) NOT NULL,
  `totalCostPrice` int(11) NOT NULL,
  `totalDiscount` int(11) NOT NULL,
  `totalRetail` int(11) NOT NULL,
  `time` time NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


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



CREATE TABLE `return_items` (
  `r_id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `SKU` varchar(255) DEFAULT NULL,
  `barcode` varchar(255) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `warehouse` varchar(255) NOT NULL,
  `company` varchar(255) NOT NULL,
  `retail_price` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  `discount_per` int(11) NOT NULL,
  `tax_per` int(11) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


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


CREATE TABLE `pos_closing` (
  `pos_id` int(11) NOT NULL,
  `id` int(11) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `gst` text DEFAULT NULL,
  `discount` text DEFAULT NULL,
  `company_name` varchar(255) DEFAULT NULL,
  `total_amount` decimal(13,2) DEFAULT NULL,
  `cost_price` decimal(13,2) DEFAULT NULL,
  `user_paid` decimal(13,2) DEFAULT NULL,
  `discount_price` decimal(13,2) DEFAULT NULL,
  `transaction` varchar(255) DEFAULT NULL,
  `time` time NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


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
-- Indexes for table `return_items`
--
ALTER TABLE `return_items`
  ADD PRIMARY KEY (`r_id`),
  ADD KEY `email` (`email`);

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
  MODIFY `cus_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `expenses`
--
ALTER TABLE `expenses`
  MODIFY `ex_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `pos_closing`
--
ALTER TABLE `pos_closing`
  MODIFY `pos_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=179;

--
-- AUTO_INCREMENT for table `return_items`
--
ALTER TABLE `return_items`
  MODIFY `r_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=108;

--
-- AUTO_INCREMENT for table `shopify_warehouse`
--
ALTER TABLE `shopify_warehouse`
  MODIFY `sw_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `status`
--
ALTER TABLE `status`
  MODIFY `s_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `supplier`
--
ALTER TABLE `supplier`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `transfer`
--
ALTER TABLE `transfer`
  MODIFY `ts_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `warehouse`
--
ALTER TABLE `warehouse`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `warehouse_counter`
--
ALTER TABLE `warehouse_counter`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `warehouse_product`
--
ALTER TABLE `warehouse_product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

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
-- Constraints for table `return_items`
--
ALTER TABLE `return_items`
  ADD CONSTRAINT `return_items_ibfk_1` FOREIGN KEY (`email`) REFERENCES `users` (`email`) ON DELETE CASCADE;

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


INSERT INTO `users` (`id`, `company`, `fname`, `lname`, `email`, `password`, `userToken`) VALUES
(1, 'VIP wears', 'Umaid', 'Khakwani', 'umaidkhakwani92@gmail.com', '12345678', '786');


INSERT INTO `warehouse` (`id`, `email`, `title`, `city`, `address`, `country`, `association`, `role`, `company`, `date`, `time`) VALUES
(1, 'umaidkhakwani92@gmail.com', 'warehouse 1', 'amanah mall', 'Lahore', 'Pakistan', 'other', '1', 'VIP wears', '2023-11-27', '23:41:01'),
(2, 'umaidkhakwani92@gmail.com', 'Jag shopify', 'sialkot road', 'sialkot', 'pakistan', 'Shopify', '0', 'VIP wears', '2023-11-27', '23:43:53');



INSERT INTO `warehouse_product` (`id`, `email`, `company`, `warehouse`, `SKU`, `quantity`, `counter`) VALUES
(1, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ7569-Bk-L', 40, 0),
(2, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ7569-M', 32, 0),
(3, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ7860-BLK-L', 32, 0),
(4, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ7569-XL', 23, 0),
(5, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ7569-Bk-XL', 21, 0),
(6, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ9890-BRN-M', 25, 0),
(7, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ7860-BLK-XL', 40, 0),
(8, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ2652-RED-M', 55, 0),
(9, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ9890-BRN-XL', 23, 0),
(10, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ9890-BRN-L', 38, 0),
(11, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ7569-Bk-M', 32, 0),
(12, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ7569-2XL', 28, 0),
(13, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ7860-BLK-2XL', 30, 0),
(14, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ2652-RED-L', 23, 0),
(15, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ9890-BRN-S', 12, 0),
(16, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ-9972-BK-L', 24, 0),
(17, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ7569-Bk-2XL', 44, 0),
(18, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ9890-BRN-2XL', 56, 0),
(19, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ7860-BLK-S', 33, 0),
(20, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ2652-RED-XL', 34, 0),
(21, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ2652-RED-2XL', 35, 0),
(22, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ7569-S', 21, 0),
(23, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ2652-RED-XS', 32, 0),
(24, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ7860-BLK-M', 21, 0),
(25, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ-5523-BK-M', 98, 0),
(26, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ2652-RED-S', 65, 0),
(27, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ-3343-L', 22, 0),
(28, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ7860-BLK-3XL', 34, 0),
(29, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ-9972-BK-M', 32, 0),
(30, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ-5523-BK-L', 47, 0),
(31, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ-5524-BK-L', 22, 0),
(32, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ2652-RED-3XL', 11, 0),
(33, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ7860-BLK-4XL', 44, 0),
(34, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ-2243-BR-L', 23, 0),
(35, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ9890-BRN-3XL', 32, 0),
(36, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ-7391-BK-L', 21, 0),
(37, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ7569-3XL', 23, 0),
(38, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ6438-X', 24, 0),
(39, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ6438-M', 45, 0),
(40, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ652-BLK-L', 11, 0),
(41, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ7569-Bk-S', 23, 0),
(42, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ-5524-BK-M', 1, 0),
(43, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ-8887-BK-L', 23, 0),
(44, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ652-BLU-M', 34, 0),
(45, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ-9972-BK-XL', 23, 0),
(46, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ-5523-BK-S', 65, 0),
(47, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ652-BLU-L', 12, 0),
(48, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ7569-Bk-3XL', 34, 0),
(49, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ-5523-BK-XL', 63, 0),
(50, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ-5523-BK-3XL', 99, 0),
(51, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ-3343-M', 27, 0),
(52, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ-2243-BR-XL', 25, 0),
(53, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ6438-2XL', 56, 0),
(54, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ652-BLU-XL', 65, 0),
(55, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ9890-BRN-XS', 34, 0),
(56, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ-7391-BK-XL', 45, 0),
(57, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ-8887-BK-XL', 34, 0),
(58, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ-5524-BK-XL', 64, 0),
(59, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ652-BLK-M', 45, 0),
(60, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ-2243-BR-S', 23, 0),
(61, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ-7391-BK-M', 23, 0),
(62, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ-8887-BK-M', 34, 0),
(63, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ-3343-S', 23, 0),
(64, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ7569-Bk-XS', 2, 0),
(65, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ-9972-BK-2XL', 37, 0),
(66, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ-9972-BK-XS', 42, 0),
(67, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ-5523-BK-2XL', 89, 0),
(68, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ7569-XS', 21, 0),
(69, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ6438-3XL', 22, 0),
(70, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ652-BLK-XL', 2, 0),
(71, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ652-BLK-S', 32, 0),
(72, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ-8887-BK-XS', 34, 0),
(73, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ-5524-BK-2XL', 32, 0),
(74, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ652-BLU-S', 11, 0),
(75, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ-2243-BR-2XL', 18, 0),
(76, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ-2243-BR-M', 21, 0),
(77, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ-7391-BK-S', 32, 0),
(78, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ-8887-BK-2XL', 2, 0),
(79, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ-7391-BK-2XL', 32, 0),
(80, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ-8887-BK-S', 23, 0),
(81, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ-9972-BK-3XL', 21, 0),
(82, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ652-BLK-2XL', 43, 0),
(83, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ-7391-BK-3XL', 9, 0),
(84, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ-5524-BK-XS', 21, 0),
(85, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ-3343-XXXL', 33, 0),
(86, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ652-BLU-2XL', 22, 0),
(87, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ652-BLU-3XL', 11, 0),
(88, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ652-BLK-3XL', 22, 0),
(89, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ652-BLK-XS', 66, 0),
(90, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ-9972-BK-S', 32, 0),
(91, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ-7391-BK-XS', 44, 0),
(92, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ-5523-BK-XS', 49, 0),
(93, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ-3343-XXL', 66, 0),
(94, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ6438-L', 33, 0),
(95, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ652-BLU-XS', 23, 0),
(96, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ-2243-BR-3XL', 12, 0),
(97, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ-8887-BK-3XL', 45, 0),
(98, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ-5524-BK-3XL', 22, 0),
(99, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ-5524-BK-S', 56, 0),
(100, 'umaidkhakwani92@gmail.com', 'VIP wears', 'warehouse 1', 'AZ-3343-XS', 65, 0);



INSERT INTO `customers` (`cus_id`, `email`, `name`, `cus_email`, `company`, `phone`, `date`, `time`) VALUES
(4, 'umaidkhakwani92@gmail.com', '', '', 'VIP wears', '', '2023-11-28', '02:13:29'),
(5, 'umaidkhakwani92@gmail.com', '', '', 'VIP wears', '', '2023-11-28', '02:14:04'),
(6, 'umaidkhakwani92@gmail.com', '', '', 'VIP wears', '', '2023-11-28', '02:18:28');


INSERT INTO `expenses` (`ex_id`, `email`, `title`, `warehouse`, `company`, `retail`, `tax_amount`, `tax_percentage`, `date`, `time`) VALUES
(1, 'umaidkhakwani92@gmail.com', 'PPC November', 'warehouse 1', 'VIP wears', '20', 2, 10, '2023-11-28', '02:28:51');




INSERT INTO `pos_closing` (`pos_id`, `id`, `description`, `gst`, `discount`, `company_name`, `total_amount`, `cost_price`, `user_paid`, `discount_price`, `transaction`, `time`, `date`) VALUES
(1, 1, 'az7569-xl(411),', 'az7569-xl(0),', 'az7569-xl(0),', 'VIP wears', 12529.00, 0.00, 30.00, 0.00, 'card', '10:21:05', '2023-06-06'),
(2, 1, 'az7569-m(373),', 'az7569-m(0),', 'az7569-m(0),', 'VIP wears', 11258.00, 0.00, 30.00, 0.00, 'card', '11:21:05', '2023-06-07'),
(3, 1, 'az7569-bk-l(355),', 'az7569-bk-l(0),', 'az7569-bk-l(0),', 'VIP wears', 10907.00, 0.00, 30.00, 0.00, 'card', '12:21:05', '2023-06-08'),
(4, 1, 'az7569-l(332),', 'az7569-l(0),', 'az7569-l(0),', 'VIP wears', 9983.00, 0.00, 30.00, 0.00, 'card', '13:21:05', '2023-06-09'),
(5, 1, 'az7569-bk-xl(262),', 'az7569-bk-xl(0),', 'az7569-bk-xl(0),', 'VIP wears', 7911.00, 0.00, 30.00, 0.00, 'card', '14:21:05', '2023-06-10'),
(6, 1, 'az7860-blk-l(241),', 'az7860-blk-l(0),', 'az7860-blk-l(0),', 'VIP wears', 13593.00, 0.00, 56.00, 0.00, 'card', '15:21:05', '2023-06-11'),
(7, 1, 'az7860-blk-xl(206),', 'az7860-blk-xl(0),', 'az7860-blk-xl(0),', 'VIP wears', 11932.00, 0.00, 57.00, 0.00, 'card', '16:21:05', '2023-06-12'),
(8, 1, 'az9890-brn-xl(169),', 'az9890-brn-xl(0),', 'az9890-brn-xl(0),', 'VIP wears', 3400.00, 0.00, 20.00, 0.00, 'card', '17:21:05', '2023-06-13'),
(9, 1, 'az9890-brn-l(160),', 'az9890-brn-l(0),', 'az9890-brn-l(0),', 'VIP wears', 3059.00, 0.00, 19.00, 0.00, 'card', '18:21:05', '2023-06-14'),
(10, 1, 'az7569-xl(155),', 'az7569-xl(0),', 'az7569-xl(0),', 'VIP wears', 5123.00, 0.00, 33.00, 0.00, 'card', '19:21:05', '2023-06-15'),
(11, 1, 'az7569-2xl(152),', 'az7569-2xl(0),', 'az7569-2xl(0),', 'VIP wears', 4684.00, 0.00, 30.00, 0.00, 'card', '20:21:05', '2023-06-16'),
(12, 1, 'az9890-brn-m(156),', 'az9890-brn-m(0),', 'az9890-brn-m(0),', 'VIP wears', 3099.00, 0.00, 19.00, 0.00, 'card', '21:21:05', '2023-06-17'),
(13, 1, 'az7569-bk-m(149),', 'az7569-bk-m(0),', 'az7569-bk-m(0),', 'VIP wears', 4603.00, 0.00, 30.00, 0.00, 'card', '22:21:05', '2023-06-18'),
(14, 1, 'az7569-l(148),', 'az7569-l(0),', 'az7569-l(0),', 'VIP wears', 4735.00, 0.00, 31.00, 0.00, 'card', '23:21:05', '2023-06-19'),
(15, 1, 'az7860-blk-2xl(141),', 'az7860-blk-2xl(0),', 'az7860-blk-2xl(0),', 'VIP wears', 8352.00, 0.00, 59.00, 0.00, 'card', '00:21:05', '2023-06-20'),
(16, 1, 'az7860-blk-m(128),', 'az7860-blk-m(0),', 'az7860-blk-m(0),', 'VIP wears', 7378.00, 0.00, 57.00, 0.00, 'card', '01:21:05', '2023-06-21'),
(17, 1, 'az9890-brn-m(126),', 'az9890-brn-m(0),', 'az9890-brn-m(0),', 'VIP wears', 2551.00, 0.00, 20.00, 0.00, 'card', '02:21:05', '2023-06-22'),
(18, 1, 'az7569-m(116),', 'az7569-m(0),', 'az7569-m(0),', 'VIP wears', 3828.00, 0.00, 33.00, 0.00, 'card', '03:21:05', '2023-06-23'),
(19, 1, 'az9890-brn-l(118),', 'az9890-brn-l(0),', 'az9890-brn-l(0),', 'VIP wears', 2448.00, 0.00, 20.00, 0.00, 'card', '04:21:05', '2023-06-24'),
(20, 1, 'az9890-brn-xl(113),', 'az9890-brn-xl(0),', 'az9890-brn-xl(0),', 'VIP wears', 2205.00, 0.00, 19.00, 0.00, 'card', '05:21:05', '2023-06-25'),
(21, 1, 'az2652-red-m(98),', 'az2652-red-m(0),', 'az2652-red-m(0),', 'VIP wears', 2406.00, 0.00, 24.00, 0.00, 'card', '06:21:05', '2023-06-26'),
(22, 1, 'az7569-bk-2xl(96),', 'az7569-bk-2xl(0),', 'az7569-bk-2xl(0),', 'VIP wears', 2985.00, 0.00, 31.00, 0.00, 'card', '07:21:05', '2023-06-27'),
(23, 1, 'az9890-brn-s(94),', 'az9890-brn-s(0),', 'az9890-brn-s(0),', 'VIP wears', 1917.00, 0.00, 20.00, 0.00, 'card', '08:21:05', '2023-06-28'),
(24, 1, 'az6438-m(91),', 'az6438-m(0),', 'az6438-m(0),', 'VIP wears', 2404.00, 0.00, 26.00, 0.00, 'card', '09:21:05', '2023-06-29'),
(25, 1, 'az6438-l(83),', 'az6438-l(0),', 'az6438-l(0),', 'VIP wears', 2266.00, 0.00, 27.00, 0.00, 'card', '10:21:05', '2023-06-30'),
(26, 1, 'az6438-x(82),', 'az6438-x(0),', 'az6438-x(0),', 'VIP wears', 2131.00, 0.00, 25.00, 0.00, 'card', '11:21:05', '2023-07-01'),
(27, 1, 'az2652-red-l(81),', 'az2652-red-l(0),', 'az2652-red-l(0),', 'VIP wears', 1995.00, 0.00, 24.00, 0.00, 'card', '12:21:05', '2023-07-02'),
(28, 1, 'az7860-blk-3xl(75),', 'az7860-blk-3xl(0),', 'az7860-blk-3xl(0),', 'VIP wears', 4193.00, 0.00, 55.00, 0.00, 'card', '13:21:05', '2023-07-03'),
(29, 1, 'az2652-red-xl(76),', 'az2652-red-xl(0),', 'az2652-red-xl(0),', 'VIP wears', 1856.00, 0.00, 24.00, 0.00, 'card', '14:21:05', '2023-07-04'),
(30, 1, 'az7569-s(70),', 'az7569-s(0),', 'az7569-s(0),', 'VIP wears', 2119.00, 0.00, 30.00, 0.00, 'card', '15:21:05', '2023-07-05'),
(31, 1, 'az9890-brn-2xl(69),', 'az9890-brn-2xl(0),', 'az9890-brn-2xl(0),', 'VIP wears', 1365.00, 0.00, 19.00, 0.00, 'card', '16:21:05', '2023-07-06'),
(32, 1, 'az7860-blk-s(68),', 'az7860-blk-s(0),', 'az7860-blk-s(0),', 'VIP wears', 3917.00, 0.00, 57.00, 0.00, 'card', '17:21:05', '2023-07-07'),
(33, 1, 'az7569-3xl(65),', 'az7569-3xl(0),', 'az7569-3xl(0),', 'VIP wears', 1896.00, 0.00, 29.00, 0.00, 'card', '18:21:05', '2023-07-08'),
(34, 1, 'az7569-2xl(61),', 'az7569-2xl(0),', 'az7569-2xl(0),', 'VIP wears', 2019.00, 0.00, 33.00, 0.00, 'card', '19:21:05', '2023-07-09'),
(35, 1, 'az652-blk-l(59),', 'az652-blk-l(0),', 'az652-blk-l(0),', 'VIP wears', 1348.00, 0.00, 22.00, 0.00, 'card', '20:21:05', '2023-07-10'),
(36, 1, 'az7860-blk-4xl(54),', 'az7860-blk-4xl(0),', 'az7860-blk-4xl(0),', 'VIP wears', 3004.00, 0.00, 55.00, 0.00, 'card', '21:21:05', '2023-07-11'),
(37, 1, 'az-2243-br-l(48),', 'az-2243-br-l(0),', 'az-2243-br-l(0),', 'VIP wears', 1349.00, 0.00, 28.00, 0.00, 'card', '22:21:05', '2023-07-12'),
(38, 1, 'az652-blk-m(46),', 'az652-blk-m(0),', 'az652-blk-m(0),', 'VIP wears', 1056.00, 0.00, 22.00, 0.00, 'card', '23:21:05', '2023-07-13'),
(39, 1, 'az652-blu-l(47),', 'az652-blu-l(0),', 'az652-blu-l(0),', 'VIP wears', 1153.00, 0.00, 24.00, 0.00, 'card', '00:21:05', '2023-07-14'),
(40, 1, 'az-7391-bk-l(46),', 'az-7391-bk-l(0),', 'az-7391-bk-l(0),', 'VIP wears', 1349.00, 0.00, 29.00, 0.00, 'card', '01:21:05', '2023-07-15'),
(41, 1, 'az-9972-bk-l(46),', 'az-9972-bk-l(0),', 'az-9972-bk-l(0),', 'VIP wears', 1392.00, 0.00, 30.00, 0.00, 'card', '02:21:05', '2023-07-16'),
(42, 1, 'az9890-brn-s(45),', 'az9890-brn-s(0),', 'az9890-brn-s(0),', 'VIP wears', 874.00, 0.00, 19.00, 0.00, 'card', '03:21:05', '2023-07-17'),
(43, 1, 'az-2243-br-xl(45),', 'az-2243-br-xl(0),', 'az-2243-br-xl(0),', 'VIP wears', 1265.00, 0.00, 28.00, 0.00, 'card', '04:21:05', '2023-07-18'),
(44, 1, 'az9890-brn-2xl(44),', 'az9890-brn-2xl(0),', 'az9890-brn-2xl(0),', 'VIP wears', 854.00, 0.00, 19.00, 0.00, 'card', '05:21:05', '2023-07-19'),
(45, 1, 'az-2243-br-m(44),', 'az-2243-br-m(0),', 'az-2243-br-m(0),', 'VIP wears', 1319.00, 0.00, 29.00, 0.00, 'card', '06:21:05', '2023-07-20'),
(46, 1, 'az6438-2xl(44),', 'az6438-2xl(0),', 'az6438-2xl(0),', 'VIP wears', 1095.00, 0.00, 24.00, 0.00, 'card', '07:21:05', '2023-07-21'),
(47, 1, 'az-5523-bk-l(42),', 'az-5523-bk-l(0),', 'az-5523-bk-l(0),', 'VIP wears', 1694.00, 0.00, 40.00, 0.00, 'card', '08:21:05', '2023-07-22'),
(48, 1, 'az9424-m(45),', 'az9424-m(0),', 'az9424-m(0),', 'VIP wears', 715.00, 0.00, 15.00, 0.00, 'card', '09:21:05', '2023-07-23'),
(49, 1, 'az6438-l(41),', 'az6438-l(0),', 'az6438-l(0),', 'VIP wears', 1231.00, 0.00, 30.00, 0.00, 'card', '10:21:05', '2023-07-24'),
(50, 1, 'az6438-xl(41),', 'az6438-xl(0),', 'az6438-xl(0),', 'VIP wears', 1228.00, 0.00, 29.00, 0.00, 'card', '11:21:05', '2023-07-25'),
(51, 1, 'az-5523-bk-xl(41),', 'az-5523-bk-xl(0),', 'az-5523-bk-xl(0),', 'VIP wears', 1675.00, 0.00, 40.00, 0.00, 'card', '12:21:05', '2023-07-26'),
(52, 1, 'az9890-brn-3xl(40),', 'az9890-brn-3xl(0),', 'az9890-brn-3xl(0),', 'VIP wears', 789.00, 0.00, 19.00, 0.00, 'card', '13:21:05', '2023-07-27'),
(53, 1, 'az-9972-bk-xl(37),', 'az-9972-bk-xl(0),', 'az-9972-bk-xl(0),', 'VIP wears', 1092.00, 0.00, 29.00, 0.00, 'card', '14:21:05', '2023-07-28'),
(54, 1, 'az9424-xl(38),', 'az9424-xl(0),', 'az9424-xl(0),', 'VIP wears', 590.00, 0.00, 15.00, 0.00, 'card', '15:21:05', '2023-07-29'),
(55, 1, 'az2652-red-2xl(36),', 'az2652-red-2xl(0),', 'az2652-red-2xl(0),', 'VIP wears', 876.00, 0.00, 24.00, 0.00, 'card', '16:21:05', '2023-07-30'),
(56, 1, 'az-9972-bk-m(36),', 'az-9972-bk-m(0),', 'az-9972-bk-m(0),', 'VIP wears', 1035.00, 0.00, 28.00, 0.00, 'card', '17:21:05', '2023-07-31'),
(57, 1, 'az2652-red-xs(32),', 'az2652-red-xs(0),', 'az2652-red-xs(0),', 'VIP wears', 772.00, 0.00, 24.00, 0.00, 'card', '18:21:05', '2023-08-01'),
(58, 1, 'az-5523-bk-m(31),', 'az-5523-bk-m(0),', 'az-5523-bk-m(0),', 'VIP wears', 1263.00, 0.00, 40.00, 0.00, 'card', '19:21:05', '2023-08-02'),
(59, 1, 'az9890-brn-xs(36),', 'az9890-brn-xs(0),', 'az9890-brn-xs(0),', 'VIP wears', 729.00, 0.00, 20.00, 0.00, 'card', '20:21:05', '2023-08-03'),
(60, 1, 'az9424-l(29),', 'az9424-l(0),', 'az9424-l(0),', 'VIP wears', 451.00, 0.00, 15.00, 0.00, 'card', '21:21:05', '2023-08-04'),
(61, 1, 'az2652-red-s(29),', 'az2652-red-s(0),', 'az2652-red-s(0),', 'VIP wears', 705.00, 0.00, 24.00, 0.00, 'card', '22:21:05', '2023-08-05'),
(62, 1, 'az652-blk-xl(28),', 'az652-blk-xl(0),', 'az652-blk-xl(0),', 'VIP wears', 684.00, 0.00, 24.00, 0.00, 'card', '23:21:05', '2023-08-06'),
(63, 1, 'az-7391-bk-xl(28),', 'az-7391-bk-xl(0),', 'az-7391-bk-xl(0),', 'VIP wears', 753.00, 0.00, 26.00, 0.00, 'card', '00:21:05', '2023-08-07'),
(64, 1, 'az9890-brn-3xl(28),', 'az9890-brn-3xl(0),', 'az9890-brn-3xl(0),', 'VIP wears', 581.00, 0.00, 20.00, 0.00, 'card', '01:21:05', '2023-08-08'),
(65, 1, 'az7569-bk-s(27),', 'az7569-bk-s(0),', 'az7569-bk-s(0),', 'VIP wears', 850.00, 0.00, 31.00, 0.00, 'card', '02:21:05', '2023-08-09'),
(66, 1, 'az7569-bk-3xl(27),', 'az7569-bk-3xl(0),', 'az7569-bk-3xl(0),', 'VIP wears', 842.00, 0.00, 31.00, 0.00, 'card', '03:21:05', '2023-08-10'),
(67, 1, 'az7569-xs(25),', 'az7569-xs(0),', 'az7569-xs(0),', 'VIP wears', 734.00, 0.00, 29.00, 0.00, 'card', '04:21:05', '2023-08-11'),
(68, 1, 'az9424-l1(25),', 'az9424-l1(0),', 'az9424-l1(0),', 'VIP wears', 399.00, 0.00, 15.00, 0.00, 'card', '05:21:05', '2023-08-12'),
(69, 1, 'az2652-red-3xl(24),', 'az2652-red-3xl(0),', 'az2652-red-3xl(0),', 'VIP wears', 543.00, 0.00, 22.00, 0.00, 'card', '06:21:05', '2023-08-13'),
(70, 1, 'az652-blk-s(23),', 'az652-blk-s(0),', 'az652-blk-s(0),', 'VIP wears', 514.00, 0.00, 22.00, 0.00, 'card', '07:21:05', '2023-08-14'),
(71, 1, 'az652-blk-2xl(22),', 'az652-blk-2xl(0),', 'az652-blk-2xl(0),', 'VIP wears', 489.00, 0.00, 22.00, 0.00, 'card', '08:21:05', '2023-08-15'),
(72, 1, 'az9890-brn-xs(23),', 'az9890-brn-xs(0),', 'az9890-brn-xs(0),', 'VIP wears', 457.00, 0.00, 19.00, 0.00, 'card', '09:21:05', '2023-08-16'),
(73, 1, 'az7569-s(21),', 'az7569-s(0),', 'az7569-s(0),', 'VIP wears', 689.00, 0.00, 32.00, 0.00, 'card', '10:21:05', '2023-08-17'),
(74, 1, 'az7569-bk-xl(21),', 'az7569-bk-xl(0),', 'az7569-bk-xl(0),', 'VIP wears', 442.00, 0.00, 21.00, 0.00, 'card', '11:21:05', '2023-08-18'),
(75, 1, 'az-2243-br-s(21),', 'az-2243-br-s(0),', 'az-2243-br-s(0),', 'VIP wears', 599.00, 0.00, 28.00, 0.00, 'card', '12:21:05', '2023-08-19'),
(76, 1, 'az-7391-bk-m(20),', 'az-7391-bk-m(0),', 'az-7391-bk-m(0),', 'VIP wears', 573.00, 0.00, 28.00, 0.00, 'card', '13:21:05', '2023-08-20'),
(77, 1, 'az7569-xs(19),', 'az7569-xs(0),', 'az7569-xs(0),', 'VIP wears', 626.00, 0.00, 32.00, 0.00, 'card', '14:21:05', '2023-08-21'),
(78, 1, 'az652-blu-xl(20),', 'az652-blu-xl(0),', 'az652-blu-xl(0),', 'VIP wears', 485.00, 0.00, 24.00, 0.00, 'card', '15:21:05', '2023-08-22'),
(79, 1, 'az-5523-bk-2xl(19),', 'az-5523-bk-2xl(0),', 'az-5523-bk-2xl(0),', 'VIP wears', 774.00, 0.00, 40.00, 0.00, 'card', '16:21:05', '2023-08-23'),
(80, 1, 'az6438-2xl(19),', 'az6438-2xl(0),', 'az6438-2xl(0),', 'VIP wears', 572.00, 0.00, 30.00, 0.00, 'card', '17:21:05', '2023-08-24'),
(81, 1, 'az7569-bk-xs(18),', 'az7569-bk-xs(0),', 'az7569-bk-xs(0),', 'VIP wears', 558.00, 0.00, 31.00, 0.00, 'card', '18:21:05', '2023-08-25'),
(82, 1, 'az7569-3xl(17),', 'az7569-3xl(0),', 'az7569-3xl(0),', 'VIP wears', 560.00, 0.00, 32.00, 0.00, 'card', '19:21:05', '2023-08-26'),
(83, 1, 'az652-blu-m(17),', 'az652-blu-m(0),', 'az652-blu-m(0),', 'VIP wears', 394.00, 0.00, 23.00, 0.00, 'card', '20:21:05', '2023-08-27'),
(84, 1, 'az-7391-bk-3xl(16),', 'az-7391-bk-3xl(0),', 'az-7391-bk-3xl(0),', 'VIP wears', 389.00, 0.00, 24.00, 0.00, 'card', '21:21:05', '2023-08-28'),
(85, 1, 'az652-blu-s(15),', 'az652-blu-s(0),', 'az652-blu-s(0),', 'VIP wears', 368.00, 0.00, 24.00, 0.00, 'card', '22:21:05', '2023-08-29'),
(86, 1, 'az-9972-bk-s(15),', 'az-9972-bk-s(0),', 'az-9972-bk-s(0),', 'VIP wears', 419.00, 0.00, 27.00, 0.00, 'card', '23:21:05', '2023-08-30'),
(87, 1, 'az652-blk-xs(14),', 'az652-blk-xs(0),', 'az652-blk-xs(0),', 'VIP wears', 315.00, 0.00, 22.00, 0.00, 'card', '00:21:05', '2023-08-31'),
(88, 1, 'az-9972-bk-2xl(14),', 'az-9972-bk-2xl(0),', 'az-9972-bk-2xl(0),', 'VIP wears', 452.00, 0.00, 32.00, 0.00, 'card', '01:21:05', '2023-09-01'),
(89, 1, 'az-9972-bk-3xl(14),', 'az-9972-bk-3xl(0),', 'az-9972-bk-3xl(0),', 'VIP wears', 419.00, 0.00, 29.00, 0.00, 'card', '02:21:05', '2023-09-02'),
(90, 1, 'az9438-l(14),', 'az9438-l(0),', 'az9438-l(0),', 'VIP wears', 381.00, 0.00, 27.00, 0.00, 'card', '03:21:05', '2023-09-03'),
(91, 1, 'az9438-xl(13),', 'az9438-xl(0),', 'az9438-xl(0),', 'VIP wears', 337.00, 0.00, 25.00, 0.00, 'card', '04:21:05', '2023-09-04'),
(92, 1, 'az6438-m(13),', 'az6438-m(0),', 'az6438-m(0),', 'VIP wears', 398.00, 0.00, 30.00, 0.00, 'card', '05:21:05', '2023-09-05'),
(93, 1, 'az-3343-l(14),', 'az-3343-l(0),', 'az-3343-l(0),', 'VIP wears', 559.00, 0.00, 39.00, 0.00, 'card', '06:21:05', '2023-09-06'),
(94, 1, 'az-2243-br-3xl(12),', 'az-2243-br-3xl(0),', 'az-2243-br-3xl(0),', 'VIP wears', 331.00, 0.00, 27.00, 0.00, 'card', '07:21:05', '2023-09-07'),
(95, 1, 'az-2243-br-2xl(12),', 'az-2243-br-2xl(0),', 'az-2243-br-2xl(0),', 'VIP wears', 359.00, 0.00, 29.00, 0.00, 'card', '08:21:05', '2023-09-08'),
(96, 1, 'az-5523-bk-s(12),', 'az-5523-bk-s(0),', 'az-5523-bk-s(0),', 'VIP wears', 439.00, 0.00, 36.00, 0.00, 'card', '09:21:05', '2023-09-09'),
(97, 1, 'az6438-s(11),', 'az6438-s(0),', 'az6438-s(0),', 'VIP wears', 329.00, 0.00, 29.00, 0.00, 'card', '10:21:05', '2023-09-10'),
(98, 1, 'az-5523-bk-m(11),', 'az-5523-bk-m(0),', 'az-5523-bk-m(0),', 'VIP wears', 472.00, 0.00, 42.00, 0.00, 'card', '11:21:05', '2023-09-11'),
(99, 1, 'az6438-3xl(10),', 'az6438-3xl(0),', 'az6438-3xl(0),', 'VIP wears', 254.00, 0.00, 25.00, 0.00, 'card', '12:21:05', '2023-09-12'),
(100, 1, 'az7569-bk-l(10),', 'az7569-bk-l(0),', 'az7569-bk-l(0),', 'VIP wears', 306.00, 0.00, 30.00, 0.00, 'card', '13:21:05', '2023-09-13'),
(101, 1, 'az-7391-bk-2xl(10),', 'az-7391-bk-2xl(0),', 'az-7391-bk-2xl(0),', 'VIP wears', 299.00, 0.00, 29.00, 0.00, 'card', '14:21:05', '2023-09-14'),
(102, 1, 'az-5524-bk-l(9),', 'az-5524-bk-l(0),', 'az-5524-bk-l(0),', 'VIP wears', 212.00, 0.00, 23.00, 0.00, 'card', '15:21:05', '2023-09-15'),
(103, 1, 'az7569-xl(8),', 'az7569-xl(0),', 'az7569-xl(0),', 'VIP wears', 279.00, 0.00, 34.00, 0.00, 'card', '16:21:05', '2023-09-16'),
(104, 1, 'az-7391-bk-s(8),', 'az-7391-bk-s(0),', 'az-7391-bk-s(0),', 'VIP wears', 239.00, 0.00, 29.00, 0.00, 'card', '17:21:05', '2023-09-17'),
(105, 1, 'az-7391-bk-xs(8),', 'az-7391-bk-xs(0),', 'az-7391-bk-xs(0),', 'VIP wears', 239.00, 0.00, 29.00, 0.00, 'card', '18:21:05', '2023-09-18'),
(106, 1, 'az-9972-bk-xs(8),', 'az-9972-bk-xs(0),', 'az-9972-bk-xs(0),', 'VIP wears', 255.00, 0.00, 31.00, 0.00, 'card', '19:21:05', '2023-09-19'),
(107, 1, 'az-5524-bk-m(9),', 'az-5524-bk-m(0),', 'az-5524-bk-m(0),', 'VIP wears', 207.00, 0.00, 23.00, 0.00, 'card', '20:21:05', '2023-09-20'),
(108, 1, 'az-5523-bk-3xl(8),', 'az-5523-bk-3xl(0),', 'az-5523-bk-3xl(0),', 'VIP wears', 328.00, 0.00, 41.00, 0.00, 'card', '21:21:05', '2023-09-21'),
(109, 1, 'az7569-l(7),', 'az7569-l(0),', 'az7569-l(0),', 'VIP wears', 244.00, 0.00, 34.00, 0.00, 'card', '22:21:05', '2023-09-22'),
(110, 1, 'az9438-2xl(7),', 'az9438-2xl(0),', 'az9438-2xl(0),', 'VIP wears', 182.00, 0.00, 26.00, 0.00, 'card', '23:21:05', '2023-09-23'),
(111, 1, 'az2214-l(7),', 'az2214-l(0),', 'az2214-l(0),', 'VIP wears', 127.00, 0.00, 18.00, 0.00, 'card', '00:21:05', '2023-09-24'),
(112, 1, 'az-2243-br-xs(7),', 'az-2243-br-xs(0),', 'az-2243-br-xs(0),', 'VIP wears', 211.00, 0.00, 30.00, 0.00, 'card', '01:21:05', '2023-09-25'),
(113, 1, 'az9424-xl1(6),', 'az9424-xl1(0),', 'az9424-xl1(0),', 'VIP wears', 95.00, 0.00, 15.00, 0.00, 'card', '02:21:05', '2023-09-26'),
(114, 1, 'az9438-m(6),', 'az9438-m(0),', 'az9438-m(0),', 'VIP wears', 160.00, 0.00, 26.00, 0.00, 'card', '03:21:05', '2023-09-27'),
(115, 1, 'az652-blu-2xl(6),', 'az652-blu-2xl(0),', 'az652-blu-2xl(0),', 'VIP wears', 149.00, 0.00, 24.00, 0.00, 'card', '04:21:05', '2023-09-28'),
(116, 1, 'az652-blk-3xl(6),', 'az652-blk-3xl(0),', 'az652-blk-3xl(0),', 'VIP wears', 140.00, 0.00, 23.00, 0.00, 'card', '05:21:05', '2023-09-29'),
(117, 1, 'az-8887-bk-m(6),', 'az-8887-bk-m(0),', 'az-8887-bk-m(0),', 'VIP wears', 134.00, 0.00, 22.00, 0.00, 'card', '06:21:05', '2023-09-30'),
(118, 1, 'az-8887-bk-l(6),', 'az-8887-bk-l(0),', 'az-8887-bk-l(0),', 'VIP wears', 124.00, 0.00, 20.00, 0.00, 'card', '07:21:05', '2023-10-01'),
(119, 1, 'az7569-xl(5),', 'az7569-xl(0),', 'az7569-xl(0),', 'VIP wears', 174.00, 0.00, 34.00, 0.00, 'card', '08:21:05', '2023-10-02'),
(120, 1, 'az2214-s(5),', 'az2214-s(0),', 'az2214-s(0),', 'VIP wears', 93.00, 0.00, 18.00, 0.00, 'card', '09:21:05', '2023-10-03'),
(121, 1, 'az6438-3xl(5),', 'az6438-3xl(0),', 'az6438-3xl(0),', 'VIP wears', 149.00, 0.00, 29.00, 0.00, 'card', '10:21:05', '2023-10-04'),
(122, 1, 'az652-blu-3xl(5),', 'az652-blu-3xl(0),', 'az652-blu-3xl(0),', 'VIP wears', 124.00, 0.00, 24.00, 0.00, 'card', '11:21:05', '2023-10-05'),
(123, 1, 'az-5523-bk-3xl(5),', 'az-5523-bk-3xl(0),', 'az-5523-bk-3xl(0),', 'VIP wears', 214.00, 0.00, 42.00, 0.00, 'card', '12:21:05', '2023-10-06'),
(124, 1, 'az7569-l(4),', 'az7569-l(0),', 'az7569-l(0),', 'VIP wears', 139.00, 0.00, 34.00, 0.00, 'card', '13:21:05', '2023-10-07'),
(125, 1, 'az2214-m(5),', 'az2214-m(0),', 'az2214-m(0),', 'VIP wears', 84.00, 0.00, 16.00, 0.00, 'card', '14:21:05', '2023-10-08'),
(126, 1, 'az652-blu-xs(4),', 'az652-blu-xs(0),', 'az652-blu-xs(0),', 'VIP wears', 99.00, 0.00, 24.00, 0.00, 'card', '15:21:05', '2023-10-09'),
(127, 1, 'az7569-bk-3xl(4),', 'az7569-bk-3xl(0),', 'az7569-bk-3xl(0),', 'VIP wears', 102.00, 0.00, 25.00, 0.00, 'card', '16:21:05', '2023-10-10'),
(128, 1, 'az-8887-bk-l(4),', 'az-8887-bk-l(0),', 'az-8887-bk-l(0),', 'VIP wears', 120.00, 0.00, 30.00, 0.00, 'card', '17:21:05', '2023-10-11'),
(129, 1, 'az-8887-bk-xl(4),', 'az-8887-bk-xl(0),', 'az-8887-bk-xl(0),', 'VIP wears', 84.00, 0.00, 21.00, 0.00, 'card', '18:21:05', '2023-10-12'),
(130, 1, 'az-5523-bk-s(4),', 'az-5523-bk-s(0),', 'az-5523-bk-s(0),', 'VIP wears', 171.00, 0.00, 42.00, 0.00, 'card', '19:21:05', '2023-10-13'),
(131, 1, 'az-5524-bk-xl(4),', 'az-5524-bk-xl(0),', 'az-5524-bk-xl(0),', 'VIP wears', 87.00, 0.00, 21.00, 0.00, 'card', '20:21:05', '2023-10-14'),
(132, 1, 'az7569-2xl(3),', 'az7569-2xl(0),', 'az7569-2xl(0),', 'VIP wears', 86.00, 0.00, 28.00, 0.00, 'card', '21:21:05', '2023-10-15'),
(133, 1, 'az9438-s(3),', 'az9438-s(0),', 'az9438-s(0),', 'VIP wears', 49.00, 0.00, 16.00, 0.00, 'card', '22:21:05', '2023-10-16'),
(134, 1, 'az7569-m(3),', 'az7569-m(0),', 'az7569-m(0),', 'VIP wears', 104.00, 0.00, 34.00, 0.00, 'card', '23:21:05', '2023-10-17'),
(135, 1, 'az9424-xl(3),', 'az9424-xl(0),', 'az9424-xl(0),', 'VIP wears', 47.00, 0.00, 15.00, 0.00, 'card', '00:21:05', '2023-10-18'),
(136, 1, 'az-8887-bk-xs(3),', 'az-8887-bk-xs(0),', 'az-8887-bk-xs(0),', 'VIP wears', 69.00, 0.00, 23.00, 0.00, 'card', '01:21:05', '2023-10-19'),
(137, 1, 'az-5524-bk-2xl(3),', 'az-5524-bk-2xl(0),', 'az-5524-bk-2xl(0),', 'VIP wears', 70.00, 0.00, 23.00, 0.00, 'card', '02:21:05', '2023-10-20'),
(138, 1, 'az-3343-s(3),', 'az-3343-s(0),', 'az-3343-s(0),', 'VIP wears', 119.00, 0.00, 39.00, 0.00, 'card', '03:21:05', '2023-10-21'),
(139, 1, 'az-3343-m(3),', 'az-3343-m(0),', 'az-3343-m(0),', 'VIP wears', 119.00, 0.00, 39.00, 0.00, 'card', '04:21:05', '2023-10-22'),
(140, 1, 'az7569-l(2),', 'az7569-l(0),', 'az7569-l(0),', 'VIP wears', 57.00, 0.00, 28.00, 0.00, 'card', '05:21:05', '2023-10-23'),
(141, 1, 'az9424-m(2),', 'az9424-m(0),', 'az9424-m(0),', 'VIP wears', 31.00, 0.00, 15.00, 0.00, 'card', '06:21:05', '2023-10-24'),
(142, 1, 'az9438-xs(2),', 'az9438-xs(0),', 'az9438-xs(0),', 'VIP wears', 55.00, 0.00, 27.00, 0.00, 'card', '07:21:05', '2023-10-25'),
(143, 1, 'az9424-xl(3),', 'az9424-xl(0),', 'az9424-xl(0),', 'VIP wears', 47.00, 0.00, 15.00, 0.00, 'card', '08:21:05', '2023-10-26'),
(144, 1, 'az6438-xs(2),', 'az6438-xs(0),', 'az6438-xs(0),', 'VIP wears', 59.00, 0.00, 29.00, 0.00, 'card', '09:21:05', '2023-10-27'),
(145, 1, 'az7569-bk-2xl(2),', 'az7569-bk-2xl(0),', 'az7569-bk-2xl(0),', 'VIP wears', 67.00, 0.00, 33.00, 0.00, 'card', '10:21:05', '2023-10-28'),
(146, 1, 'az-8887-bk-2xl(2),', 'az-8887-bk-2xl(0),', 'az-8887-bk-2xl(0),', 'VIP wears', 49.00, 0.00, 24.00, 0.00, 'card', '11:21:05', '2023-10-29'),
(147, 1, 'az-8887-bk-3xl(2),', 'az-8887-bk-3xl(0),', 'az-8887-bk-3xl(0),', 'VIP wears', 49.00, 0.00, 24.00, 0.00, 'card', '12:21:05', '2023-10-30'),
(148, 1, 'az-8887-bk-m(2),', 'az-8887-bk-m(0),', 'az-8887-bk-m(0),', 'VIP wears', 59.00, 0.00, 29.00, 0.00, 'card', '13:21:05', '2023-10-31'),
(149, 1, 'az-8887-bk-s(2),', 'az-8887-bk-s(0),', 'az-8887-bk-s(0),', 'VIP wears', 44.00, 0.00, 22.00, 0.00, 'card', '14:21:05', '2023-11-01'),
(150, 1, 'az-8887-bk-xl(2),', 'az-8887-bk-xl(0),', 'az-8887-bk-xl(0),', 'VIP wears', 49.00, 0.00, 24.00, 0.00, 'card', '15:21:05', '2023-11-02'),
(151, 1, 'az-5523-bk-2xl(2),', 'az-5523-bk-2xl(0),', 'az-5523-bk-2xl(0),', 'VIP wears', 85.00, 0.00, 42.00, 0.00, 'card', '16:21:05', '2023-11-03'),
(152, 1, 'az-5523-bk-xs(2),', 'az-5523-bk-xs(0),', 'az-5523-bk-xs(0),', 'VIP wears', 79.00, 0.00, 39.00, 0.00, 'card', '17:21:05', '2023-11-04'),
(153, 1, 'az-5524-bk-l(2),', 'az-5524-bk-l(0),', 'az-5524-bk-l(0),', 'VIP wears', 55.00, 0.00, 27.00, 0.00, 'card', '18:21:05', '2023-11-05'),
(154, 1, 'az7569-3xl(1),', 'az7569-3xl(0),', 'az7569-3xl(0),', 'VIP wears', 28.00, 0.00, 28.00, 0.00, 'card', '19:21:05', '2023-11-06'),
(155, 1, 'az7569-s(1),', 'az7569-s(0),', 'az7569-s(0),', 'VIP wears', 34.00, 0.00, 34.00, 0.00, 'card', '20:21:05', '2023-11-07'),
(156, 1, 'az7569-s(1),', 'az7569-s(0),', 'az7569-s(0),', 'VIP wears', 34.00, 0.00, 34.00, 0.00, 'card', '21:21:05', '2023-11-08'),
(157, 1, 'az7569-2xl(1),', 'az7569-2xl(0),', 'az7569-2xl(0),', 'VIP wears', 34.00, 0.00, 34.00, 0.00, 'card', '22:21:05', '2023-11-09'),
(158, 1, 'az9424-m(1),', 'az9424-m(0),', 'az9424-m(0),', 'VIP wears', 15.00, 0.00, 15.00, 0.00, 'card', '23:21:05', '2023-11-10'),
(159, 1, 'az7569-xs(1),', 'az7569-xs(0),', 'az7569-xs(0),', 'VIP wears', 34.00, 0.00, 34.00, 0.00, 'card', '00:21:05', '2023-11-11'),
(160, 1, 'az7569-xl(1),', 'az7569-xl(0),', 'az7569-xl(0),', 'VIP wears', 28.00, 0.00, 28.00, 0.00, 'card', '01:21:05', '2023-11-12'),
(161, 1, 'az7569-m(1),', 'az7569-m(0),', 'az7569-m(0),', 'VIP wears', 34.00, 0.00, 34.00, 0.00, 'card', '02:21:05', '2023-11-13'),
(162, 1, 'az9438-3xl(1),', 'az9438-3xl(0),', 'az9438-3xl(0),', 'VIP wears', 24.00, 0.00, 24.00, 0.00, 'card', '03:21:05', '2023-11-14'),
(163, 1, 'az7569-bk-xs(1),', 'az7569-bk-xs(0),', 'az7569-bk-xs(0),', 'VIP wears', 34.00, 0.00, 34.00, 0.00, 'card', '04:21:05', '2023-11-15'),
(164, 1, 'az7569-bk-s(1),', 'az7569-bk-s(0),', 'az7569-bk-s(0),', 'VIP wears', 32.00, 0.00, 32.00, 0.00, 'card', '05:21:05', '2023-11-16'),
(165, 1, 'az7569-bk-m(1),', 'az7569-bk-m(0),', 'az7569-bk-m(0),', 'VIP wears', 34.00, 0.00, 34.00, 0.00, 'card', '06:21:05', '2023-11-17'),
(166, 1, 'az-8887-bk-2xl(1),', 'az-8887-bk-2xl(0),', 'az-8887-bk-2xl(0),', 'VIP wears', 28.00, 0.00, 28.00, 0.00, 'card', '07:21:05', '2023-11-18'),
(167, 1, 'az-8887-bk-l(1),', 'az-8887-bk-l(0),', 'az-8887-bk-l(0),', 'VIP wears', 29.00, 0.00, 29.00, 0.00, 'card', '08:21:05', '2023-11-19'),
(168, 1, 'az-8887-bk-xl(1),', 'az-8887-bk-xl(0),', 'az-8887-bk-xl(0),', 'VIP wears', 29.00, 0.00, 29.00, 0.00, 'card', '09:21:05', '2023-11-20'),
(169, 1, 'az-5524-bk-3xl(1),', 'az-5524-bk-3xl(0),', 'az-5524-bk-3xl(0),', 'VIP wears', 21.00, 0.00, 21.00, 0.00, 'card', '10:21:05', '2023-11-21'),
(170, 1, 'az-5524-bk-xs(1),', 'az-5524-bk-xs(0),', 'az-5524-bk-xs(0),', 'VIP wears', 21.00, 0.00, 21.00, 0.00, 'card', '11:21:05', '2023-11-22'),
(171, 1, 'az-5524-bk-m(1),', 'az-5524-bk-m(0),', 'az-5524-bk-m(0),', 'VIP wears', 27.00, 0.00, 27.00, 0.00, 'card', '12:21:05', '2023-11-23'),
(172, 1, 'az-5523-bk-xs(2),', 'az-5523-bk-xs(0),', 'az-5523-bk-xs(0),', 'VIP wears', 79.00, 0.00, 39.00, 0.00, 'card', '13:21:05', '2023-11-24'),
(173, 1, 'az-5523-bk-l(1),', 'az-5523-bk-l(0),', 'az-5523-bk-l(0),', 'VIP wears', 42.00, 0.00, 42.00, 0.00, 'card', '14:21:05', '2023-11-25'),
(174, 1, 'az-5524-bk-s(1),', 'az-5524-bk-s(0),', 'az-5524-bk-s(0),', 'VIP wears', 21.00, 0.00, 21.00, 0.00, 'card', '15:21:05', '2023-11-26'),
(175, 1, 'az-3343-xxl(1),', 'az-3343-xxl(0),', 'az-3343-xxl(0),', 'VIP wears', 39.00, 0.00, 39.00, 0.00, 'card', '16:21:05', '2023-11-27'),
(176, 1, 'B0BTM347YC(2),', 'B0BTM347YC(2),', 'B0BTM347YC(2),', 'VIP wears', 69.36, 68.00, 69.00, 1.00, 'Cash', '02:13:29', '2023-11-28'),
(177, 1, 'B0BTM347YC(2),', 'B0BTM347YC(2),', 'B0BTM347YC(2),', 'VIP wears', 69.36, 68.00, 69.00, 1.00, 'Card', '02:14:04', '2023-11-28'),
(178, 1, 'B0BTM2PVH9(10),', 'B0BTM2PVH9(2),', 'B0BTM2PVH9(2),', 'VIP wears', 346.80, 340.00, 341.00, 6.00, 'Cash', '02:18:28', '2023-11-28');




INSERT INTO `product_list` (`SKU`, `company`, `title`, `description`, `picture_url`, `cost_price`, `retail_price`, `weight`, `size`, `color`, `barcode`) VALUES
('AZ-2243-BR-2XL', 'VIP Wears', 'J.A.G. Leather Motorcycle Motorbike Knuckle Protection Powersports Gloves - Motorcycle Gloves Touchscreen for Men (Black Brown, XX-Large)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B0BTM347YC'),
('AZ-2243-BR-3XL', 'VIP Wears', 'J.A.G. Leather Motorcycle Motorbike Knuckle Protection Powersports Gloves - Motorcycle Gloves Touchscreen for Men (Black Brown, XXX-Large)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B0BTM2PVH9'),
('AZ-2243-BR-L', 'VIP Wears', 'J.A.G. Leather Motorcycle Motorbike Knuckle Protection Powersports Gloves - Motorcycle Gloves Touchscreen for Men (Black Brown, Large)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B0BTM3BQQC'),
('AZ-2243-BR-M', 'VIP Wears', 'J.A.G. Leather Motorcycle Motorbike Knuckle Protection Powersports Gloves - Motorcycle Gloves Touchscreen for Men (Black Brown, Medium)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B0BTM41MF1'),
('AZ-2243-BR-S', 'VIP Wears', 'J.A.G. Leather Motorcycle Motorbike Knuckle Protection Powersports Gloves - Motorcycle Gloves Touchscreen for Men (Black Brown, Small)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B0BTM4211Q'),
('AZ-2243-BR-XL', 'VIP Wears', 'J.A.G. Leather Motorcycle Motorbike Knuckle Protection Powersports Gloves - Motorcycle Gloves Touchscreen for Men (Black Brown, X-Large)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B0BTM57GGQ'),
('AZ-3343-L', 'VIP Wears', 'J.A.G. Premium Leather Motorcycle Motorbike Gloves with Knuckle Protection - Touchscreen Motorcycle Gloves for Men - Durable Powersports Gloves (White, Large)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B0CG1HQTT4'),
('AZ-3343-M', 'VIP Wears', 'J.A.G. Premium Leather Motorcycle Motorbike Gloves with Knuckle Protection - Touchscreen Motorcycle Gloves for Men - Durable Powersports Gloves (White, Medium)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B0CG1GSRTK'),
('AZ-3343-S', 'VIP Wears', 'J.A.G. Premium Leather Motorcycle Motorbike Gloves with Knuckle Protection - Touchscreen Motorcycle Gloves for Men - Durable Powersports Gloves (White, Small)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B0CG1G3CMQ'),
('AZ-3343-XS', 'VIP Wears', 'J.A.G. Premium Leather Motorcycle Motorbike Gloves with Knuckle Protection - Touchscreen Motorcycle Gloves for Men - Durable Powersports Gloves (White, X-Small)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B0CG1J52S1'),
('AZ-3343-XXL', 'VIP Wears', 'J.A.G. Premium Leather Motorcycle Motorbike Gloves with Knuckle Protection - Touchscreen Motorcycle Gloves for Men - Durable Powersports Gloves (White, XX-Large)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B0CG1CTZLM'),
('AZ-3343-XXXL', 'VIP Wears', 'J.A.G. Premium Leather Motorcycle Motorbike Gloves with Knuckle Protection - Touchscreen Motorcycle Gloves for Men - Durable Powersports Gloves (White, XXX-Large)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B0CG1FXLCM'),
('AZ-5523-BK-2XL', 'VIP Wears', 'J.A.G. Premium Leather Motorcycle Motorbike Gloves with Knuckle Protection - Touchscreen Motorcycle Gloves for Men - Durable Powersports Gloves (Black, XX-Large)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B0BTT7X8WX'),
('AZ-5523-BK-3XL', 'VIP Wears', 'J.A.G. Premium Leather Motorcycle Motorbike Gloves with Knuckle Protection - Touchscreen Motorcycle Gloves for Men - Durable Powersports Gloves (Black, XXX-Large)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B0BTT8WMNR'),
('AZ-5523-BK-L', 'VIP Wears', 'J.A.G. Premium Leather Motorcycle Motorbike Gloves with Knuckle Protection - Touchscreen Motorcycle Gloves for Men - Durable Powersports Gloves (Black, Large)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B0BTTBZFN1'),
('AZ-5523-BK-M', 'VIP Wears', 'J.A.G. Premium Leather Motorcycle Motorbike Gloves with Knuckle Protection - Touchscreen Motorcycle Gloves for Men - Durable Powersports Gloves (Black, Medium)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B0BTT9FW1M'),
('AZ-5523-BK-S', 'VIP Wears', 'J.A.G. Premium Leather Motorcycle Motorbike Gloves with Knuckle Protection - Touchscreen Motorcycle Gloves for Men - Durable Powersports Gloves (Black, Small)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B0BTT95898'),
('AZ-5523-BK-XL', 'VIP Wears', 'J.A.G. Premium Leather Motorcycle Motorbike Gloves with Knuckle Protection - Touchscreen Motorcycle Gloves for Men - Durable Powersports Gloves (Black, X-Large)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B0BTT4TSHB'),
('AZ-5523-BK-XS', 'VIP Wears', 'J.A.G. Premium Leather Motorcycle Motorbike Gloves with Knuckle Protection - Touchscreen Motorcycle Gloves for Men - Durable Powersports Gloves (Black, X-Small)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B0BTT9CK6N'),
('AZ-5524-BK-2XL', 'VIP Wears', 'J.A.G. Motorcycle Gloves for Men - Genuine Leather Touchscreen Motorbike Glove for Riding, Road Racing, Cycling, Motocross, Hunting (Black/White, XX-Large)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B0BTT9612V'),
('AZ-5524-BK-3XL', 'VIP Wears', 'J.A.G. Motorcycle Gloves for Men - Genuine Leather Touchscreen Motorbike Glove for Riding, Road Racing, Cycling, Motocross, Hunting (Black/White, XXX-Large)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B0BTT7T2W2'),
('AZ-5524-BK-L', 'VIP Wears', 'J.A.G. Motorcycle Gloves for Men - Genuine Leather Touchscreen Motorbike Glove for Riding, Road Racing, Cycling, Motocross, Hunting (Black/White, Large)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B0BTTBJS7N'),
('AZ-5524-BK-M', 'VIP Wears', 'J.A.G. Motorcycle Gloves for Men - Genuine Leather Touchscreen Motorbike Glove for Riding, Road Racing, Cycling, Motocross, Hunting (Black/White, Medium)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B0BTT8KK1W'),
('AZ-5524-BK-S', 'VIP Wears', 'J.A.G. Motorcycle Gloves for Men - Genuine Leather Touchscreen Motorbike Glove for Riding, Road Racing, Cycling, Motocross, Hunting (Black/White, Small)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B0BTTHLLTS'),
('AZ-5524-BK-XL', 'VIP Wears', 'J.A.G. Motorcycle Gloves for Men - Genuine Leather Touchscreen Motorbike Glove for Riding, Road Racing, Cycling, Motocross, Hunting (Black/White, X-Large)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B0BTTB27BR'),
('AZ-5524-BK-XS', 'VIP Wears', 'J.A.G. Motorcycle Gloves for Men - Genuine Leather Touchscreen Motorbike Glove for Riding, Road Racing, Cycling, Motocross, Hunting (Black/White, X-Small)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B0BTT84PRW'),
('AZ-7391-BK-2XL', 'VIP Wears', 'J.A.G. JAG Leather Motorcycle Motorbike Knuckle Protection Powersports Gloves - Motorcycle Gloves Touchscreen for Men (All Black, XX-Large)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B0BTMCWC5K'),
('AZ-7391-BK-3XL', 'VIP Wears', 'J.A.G. Leather Motorcycle Motorbike Knuckle Protection Powersports Gloves - Motorcycle Gloves Touchscreen for Men (All Black, XXX-Large)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B0BTM9D1T3'),
('AZ-7391-BK-L', 'VIP Wears', 'J.A.G. JAG Leather Motorcycle Motorbike Knuckle Protection Powersports Gloves - Motorcycle Gloves Touchscreen for Men (All Black, Large)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B0BTMBHB7H'),
('AZ-7391-BK-M', 'VIP Wears', 'J.A.G. JAG Leather Motorcycle Motorbike Knuckle Protection Powersports Gloves - Motorcycle Gloves Touchscreen for Men (All Black, Medium)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B0BTMBPGQ2'),
('AZ-7391-BK-S', 'VIP Wears', 'J.A.G. JAG Leather Motorcycle Motorbike Knuckle Protection Powersports Gloves - Motorcycle Gloves Touchscreen for Men (All Black, Small)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B0BTM98CX8'),
('AZ-7391-BK-XL', 'VIP Wears', 'J.A.G. JAG Leather Motorcycle Motorbike Knuckle Protection Powersports Gloves - Motorcycle Gloves Touchscreen for Men (All Black, X-Large)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B0BTMCD24Z'),
('AZ-7391-BK-XS', 'VIP Wears', 'J.A.G. JAG Leather Motorcycle Motorbike Knuckle Protection Powersports Gloves - Motorcycle Gloves Touchscreen for Men (All Black, X-Small)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B0BTMBNCS3'),
('AZ-8887-BK-2XL', 'VIP Wears', 'J.A.G. Motorcycle Gloves for Men - Genuine Leather Touchscreen Motorbike Glove for Riding, Road Racing, Cycling, Motocross, Hunting (Black/Red, XX-Large)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B0BTMBLLS1'),
('AZ-8887-BK-3XL', 'VIP Wears', 'J.A.G. Motorcycle Gloves for Men - Genuine Leather Touchscreen Motorbike Glove for Riding, Road Racing, Cycling, Motocross, Hunting (Black/Red, XXX-Large)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B0BTMC8S2B'),
('AZ-8887-BK-L', 'VIP Wears', 'J.A.G. Motorcycle Gloves for Men - Genuine Leather Touchscreen Motorbike Glove for Riding, Road Racing, Cycling, Motocross, Hunting (Black/Red, Large)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B0BTMDHJ8W'),
('AZ-8887-BK-M', 'VIP Wears', 'J.A.G. Motorcycle Gloves for Men - Genuine Leather Touchscreen Motorbike Glove for Riding, Road Racing, Cycling, Motocross, Hunting (Black/Red, Medium)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B0BTMDCTZQ'),
('AZ-8887-BK-S', 'VIP Wears', 'J.A.G. Motorcycle Gloves for Men - Genuine Leather Touchscreen Motorbike Glove for Riding, Road Racing, Cycling, Motocross, Hunting (Black/Red, Small)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B0BTMDF73P'),
('AZ-8887-BK-XL', 'VIP Wears', 'J.A.G. Motorcycle Gloves for Men - Genuine Leather Touchscreen Motorbike Glove for Riding, Road Racing, Cycling, Motocross, Hunting (Black/Red, X-Large)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B0BTMDLQTN'),
('AZ-8887-BK-XS', 'VIP Wears', 'J.A.G. Motorcycle Gloves for Men - Genuine Leather Touchscreen Motorbike Glove for Riding, Road Racing, Cycling, Motocross, Hunting (Black/Red, X-Small)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B0BTM8TC94'),
('AZ-9972-BK-2XL', 'VIP Wears', 'J.A.G. Leather Motorcycle Motorbike Knuckle Protection Powersports Gloves - Motorcycle Gloves Touchscreen for Men (Black/Zip, XX-Large)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B0BTMBSZ1W'),
('AZ-9972-BK-3XL', 'VIP Wears', 'J.A.G. Leather Motorcycle Motorbike Knuckle Protection Powersports Gloves - Motorcycle Gloves Touchscreen for Men (Black/Zip, XXX-Large)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B0BTMF18WC'),
('AZ-9972-BK-L', 'VIP Wears', 'J.A.G. Leather Motorcycle Motorbike Knuckle Protection Powersports Gloves - Motorcycle Gloves Touchscreen for Men (Black/Zip, Large)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B0BTMDJTGG'),
('AZ-9972-BK-M', 'VIP Wears', 'J.A.G. Leather Motorcycle Motorbike Knuckle Protection Powersports Gloves - Motorcycle Gloves Touchscreen for Men (Black/Zip, Medium)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B0BTMB8BND'),
('AZ-9972-BK-S', 'VIP Wears', 'J.A.G. Leather Motorcycle Motorbike Knuckle Protection Powersports Gloves - Motorcycle Gloves Touchscreen for Men (Black/Zip, Small)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B0BTMBBK2R'),
('AZ-9972-BK-XL', 'VIP Wears', 'J.A.G. Leather Motorcycle Motorbike Knuckle Protection Powersports Gloves - Motorcycle Gloves Touchscreen for Men (Black/Zip, X-Large)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B0BTMD3ZDH'),
('AZ-9972-BK-XS', 'VIP Wears', 'J.A.G. Leather Motorcycle Motorbike Knuckle Protection Powersports Gloves - Motorcycle Gloves Touchscreen for Men (Black/Zip, X-Small)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B0BTMCLFT6'),
('AZ2652-RED-2XL', 'VIP Wears', 'J.A.G. JAG Leather Full Finger Driving Gloves - Cowhide Driving Motorcycle Gloves for Men and Women (2X-Large, Red)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B0B39434BZ'),
('AZ2652-RED-3XL', 'VIP Wears', 'J.A.G. JAG Leather Full Finger Driving Gloves - Cowhide Driving Motorcycle Gloves for Men and Women (3X-Large, Red)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B0B3934GB7'),
('AZ2652-RED-L', 'VIP Wears', 'J.A.G. JAG Leather Full Finger Driving Gloves - Cowhide Driving Motorcycle Gloves for Men and Women (Large, Red)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B0B3946BZ6'),
('AZ2652-RED-M', 'VIP Wears', 'J.A.G. JAG Leather Full Finger Driving Gloves - Cowhide Driving Motorcycle Gloves for Men and Women (Medium, Red)', 'hjgsdjhagshj', 'bdvdbuabb', 0.00, 34.00, 300.00, 'normal', 'Red', 'B0B395MPVD'),
('AZ2652-RED-S', 'VIP Wears', 'J.A.G. JAG Leather Full Finger Driving Gloves - Cowhide Driving Motorcycle Gloves for Men and Women (Small, Red)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B0B393L8T4'),
('AZ2652-RED-XL', 'VIP Wears', 'J.A.G. JAG Leather Full Finger Driving Gloves - Cowhide Driving Motorcycle Gloves for Men and Women (X-Large, Red)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B0B3958M3Y'),
('AZ2652-RED-XS', 'VIP Wears', 'J.A.G. JAG Leather Full Finger Driving Gloves - Cowhide Driving Motorcycle Gloves for Men and Women (X-Small, Red)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B0B3955D72'),
('AZ6438-2XL', 'VIP Wears', 'J.A.G. JAG Motorcycle Gloves |Red - Leather Motorcycle Gloves - Motorbike Gloves - Powersports - Racing Gloves - Motorcycle Gloves for Men | Motorcycle Gloves Touch Screen� (Red, XX-Large)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B09X9YFJSS'),
('AZ6438-3XL', 'VIP Wears', 'J.A.G. Motorcycle Gloves |Red - Leather Motorcycle Gloves - Motorbike Gloves - Powersports - Racing Gloves - Motorcycle Gloves for Men | Motorcycle Gloves Touch Screen� (Red, XXX-Large)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B09X9YHHDY'),
('AZ6438-L', 'VIP Wears', 'J.A.G. JAG Motorcycle Gloves |Red - Leather Motorcycle Gloves - Motorbike Gloves - Powersports - Racing Gloves - Motorcycle Gloves for Men | Motorcycle Gloves Touch Screen� (Red, Large)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B09X9Y4L6M'),
('AZ6438-M', 'VIP Wears', 'J.A.G. JAG Motorcycle Gloves |Red - Leather Motorcycle Gloves - Motorbike Gloves - Powersports - Racing Gloves - Motorcycle Gloves for Men | Motorcycle Gloves Touch Screen� (Red, Medium)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B09XB126HG'),
('AZ6438-X', 'VIP Wears', 'J.A.G. JAG Motorcycle Gloves |Red - Leather Motorcycle Gloves - Motorbike Gloves - Powersports - Racing Gloves - Motorcycle Gloves for Men | Motorcycle Gloves Touch Screen� (Red, X-Large)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B09X9Y9WYQ'),
('AZ652-BLK-2XL', 'VIP Wears', 'J.A.G. JAG Leather Full Finger Driving Gloves - Cowhide Driving Motorcycle Gloves for Men and Women (2X-Large, All Black)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B0B391X4FG'),
('AZ652-BLK-3XL', 'VIP Wears', 'J.A.G. JAG Leather Full Finger Driving Gloves - Cowhide Driving Motorcycle Gloves for Men and Women (3X-Large, All Black)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B0B393FL7R'),
('AZ652-BLK-L', 'VIP Wears', 'J.A.G. JAG Leather Full Finger Driving Gloves - Cowhide Driving Motorcycle Gloves for Men and Women (Large, All Black)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B0B391VBN8'),
('AZ652-BLK-M', 'VIP Wears', 'J.A.G. JAG Leather Full Finger Driving Gloves - Cowhide Driving Motorcycle Gloves for Men and Women (Medium, All Black)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B0B391XL5R'),
('AZ652-BLK-S', 'VIP Wears', 'J.A.G. JAG Leather Full Finger Driving Gloves - Cowhide Driving Motorcycle Gloves for Men and Women (Small, All Black)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B0B393R3XL'),
('AZ652-BLK-XL', 'VIP Wears', 'J.A.G. JAG Leather Full Finger Driving Gloves - Cowhide Driving Motorcycle Gloves for Men and Women(X-Large, All Black)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B0B3934Z81'),
('AZ652-BLK-XS', 'VIP Wears', 'J.A.G. JAG Leather Full Finger Driving Gloves - Cowhide Driving Motorcycle Gloves for Men and Women (X-Small, All Black)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B0B394TFB6'),
('AZ652-BLU-2XL', 'VIP Wears', 'J.A.G. JAG Leather Full Finger Driving Gloves - Cowhide Driving Motorcycle Gloves for Men and Women (2X-Large, Blue)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B0B392G4CM'),
('AZ652-BLU-3XL', 'VIP Wears', 'J.A.G. JAG Leather Full Finger Driving Gloves - Cowhide Driving Motorcycle Gloves for Men and Women (3X-Large, Blue)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B0B392J7FZ'),
('AZ652-BLU-L', 'VIP Wears', 'J.A.G. JAG Leather Full Finger Driving Gloves - Cowhide Driving Motorcycle Gloves for Men and Women (Large, Blue)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B0B393S4JF'),
('AZ652-BLU-M', 'VIP Wears', 'J.A.G. JJAG Leather Full Finger Driving Gloves - Cowhide Driving Motorcycle Gloves for Men and Women (Medium, Blue)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B0B392343V'),
('AZ652-BLU-S', 'VIP Wears', 'J.A.G. JJAG Leather Full Finger Driving Gloves - Cowhide Driving Motorcycle Gloves for Men and Women (Small, Blue)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B0B393D9N8'),
('AZ652-BLU-XL', 'VIP Wears', 'J.A.G. JAG Leather Full Finger Driving Gloves - Cowhide Driving Motorcycle Gloves for Men and Women (X-Large, Blue)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B0B392KG3B'),
('AZ652-BLU-XS', 'VIP Wears', 'J.A.G. JAG Leather Full Finger Driving Gloves - Cowhide Driving Motorcycle Gloves for Men and Women (X-Small, Blue)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B0B395MH6L'),
('AZ7569-2XL', 'VIP Wears', 'J.A.G. JAG Motorcycle Gloves, Brown Leather Perforated Motorcycle Gloves for Men with Knuckle Protection, Touchscreen Motorbike Gloves (Brown, XX-Large)', 'hjgsdjhagshj', 'ssde', 0.00, 34.00, 300.00, 'large', 'Red', 'B09X6VHD8G'),
('AZ7569-3XL', 'VIP Wears', 'J.A.G. JAG Motorcycle Gloves, Brown Leather Perforated Motorcycle Gloves for Men with Knuckle Protection, Touchscreen Motorbike Gloves (Brown, XXX-Large)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B09X6TFHPQ'),
('AZ7569-Bk-2XL', 'VIP Wears', 'J.A.G. Motorcycle Gloves, Leather Perforated Motorcycle Gloves for Men with Knuckle Protection, Touchscreen Motorbike Gloves (Black, XX-Large)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B0BKLC4K5C'),
('AZ7569-Bk-3XL', 'VIP Wears', 'J.A.G. Motorcycle Gloves, Leather Perforated Motorcycle Gloves for Men with Knuckle Protection, Touchscreen Motorbike Gloves (Black, XXX-Large)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B0BKLDLM37'),
('AZ7569-Bk-L', 'VIP Wears', 'J.A.G. Motorcycle Gloves, Leather Perforated Motorcycle Gloves for Men with Knuckle Protection, Touchscreen Motorbike Gloves (Black, Large)', 'hjgsdjhagshj', 'bdvdbuabb', 0.00, 34.00, 300.00, 'sdf', 'green', 'B0BKL8RD9W'),
('AZ7569-Bk-M', 'VIP Wears', 'J.A.G. Motorcycle Gloves, Leather Perforated Motorcycle Gloves for Men with Knuckle Protection, Touchscreen Motorbike Gloves (Black, Medium)', 'hjgsdjhagshj', 'bdvdbuabb', 0.00, 34.00, 300.00, 'large', 'black', 'B0BKLCBX4F'),
('AZ7569-Bk-S', 'VIP Wears', 'J.A.G. Motorcycle Gloves, Leather Perforated Motorcycle Gloves for Men with Knuckle Protection, Touchscreen Motorbike Gloves (Black, Small)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B0BKLCBG81'),
('AZ7569-Bk-XL', 'VIP Wears', 'J.A.G. Motorcycle Gloves, Leather Perforated Motorcycle Gloves for Men with Knuckle Protection, Touchscreen Motorbike Gloves (Black, X-Large)', 'hjgsdjhagshj', 'bdvdbuabb', 0.00, 34.00, 300.00, 'normal', 'green', 'B0BKL7W312'),
('AZ7569-Bk-XS', 'VIP Wears', 'J.A.G. Motorcycle Gloves, Leather Perforated Motorcycle Gloves for Men with Knuckle Protection, Touchscreen Motorbike Gloves (Black, X-Small)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B0BKL8K56D'),
('AZ7569-M', 'VIP Wears', 'J.A.G. JAG Motorcycle Gloves, Brown Leather Perforated Motorcycle Gloves for Men with Knuckle Protection, Touchscreen Motorbike Gloves (Brown, Medium)', 'hjgsdjhagshj', 'bdvdbuabb', 0.00, 34.00, 300.00, 'large', 'green', 'B09X6W3V7X'),
('AZ7569-S', 'VIP Wears', 'J.A.G. JAG Motorcycle Gloves, Brown Leather Perforated Motorcycle Gloves for Men with Knuckle Protection, Touchscreen Motorbike Gloves (Brown, Small)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B09X6TTHRX'),
('AZ7569-XL', 'VIP Wears', 'J.A.G. JAG Motorcycle Gloves, Brown Leather Perforated Motorcycle Gloves for Men with Knuckle Protection, Touchscreen Motorbike Gloves (Brown, X-Large)', 'hjgsdjhagshj', 'df', 0.00, 34.00, 300.00, 'small', 'Blue', 'B09X6W251H'),
('AZ7569-XS', 'VIP Wears', 'J.A.G. JAG Motorcycle Gloves, Brown Leather Perforated Motorcycle Gloves for Men with Knuckle Protection, Touchscreen Motorbike Gloves (Brown, X-Small)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B09X6VR75B'),
('AZ7860-BLK-2XL', 'VIP Wears', 'J.A.G. Breathable All Seasons Mesh Motorcycle Riding Shirt for Men with CE (Certified) Protective Padded Shields (as1, alpha, xx_l, regular, regular, Black, 2X-Large)', 'hjgsdjhagshj', 'dsfgxvxvxxv', 0.00, 34.00, 300.00, 'large', 'red', 'B0B5L2MXC3'),
('AZ7860-BLK-3XL', 'VIP Wears', 'J.A.G. Breathable All Seasons Mesh Motorcycle Riding Shirt for Men with CE (Certified) Protective Padded Shields (as1, alpha, 3x_l, regular, regular, Black, 3X-Large)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B0B5L8BSJT'),
('AZ7860-BLK-4XL', 'VIP Wears', 'J.A.G. Breathable All Seasons Mesh Motorcycle Riding Shirt for Men with CE (Certified) Protective Padded Shields (as1, alpha, 4x_l, regular, regular, Black, 4X-Large)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B0B5L39ZSM'),
('AZ7860-BLK-L', 'VIP Wears', 'J.A.G. Breathable All Seasons Mesh Motorcycle Riding Shirt for Men with CE (Certified) Protective Padded Shields (as1, alpha, l, regular, regular, Black, Large)', 'hjgsdjhagshj', 'df', 0.00, 34.00, 300.00, 'small', 'blacks', 'B0B5L5M2XT'),
('AZ7860-BLK-M', 'VIP Wears', 'J.A.G. Breathable All Seasons Mesh Motorcycle Riding Shirt for Men with CE (Certified) Protective Padded Shields (as1, alpha, m, regular, regular, Black, Medium)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B0B5L4G7VP'),
('AZ7860-BLK-S', 'VIP Wears', 'J.A.G. Breathable All Seasons Mesh Motorcycle Riding Shirt for Men with CE (Certified) Protective Padded Shields (as1, alpha, s, regular, regular, Black, Small)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B0B5L2YWR3'),
('AZ7860-BLK-XL', 'VIP Wears', 'J.A.G. Breathable All Seasons Mesh Motorcycle Riding Shirt for Men with CE (Certified) Protective Padded Shields (as1, alpha, x_l, regular, regular, Black, X-Large)', 'hjgsdjhagshj', 'bdvdbuabb', 0.00, 34.00, 300.00, 'normal', 'green', 'B0B5L52KGN'),
('AZ9890-BRN-2XL', 'VIP Wears', 'J.A.G. Fingerless Motorcycle Gloves, Brown Real Leather Half Finger Driving Gloves for Men, Soft Half-Cut Cow Leather Gloves (Brown, 2X-Large)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B0B395B7MB'),
('AZ9890-BRN-3XL', 'VIP Wears', 'J.A.G. Fingerless Motorcycle Gloves, Brown Real Leather Half Finger Driving Gloves for Men, Soft Half-Cut Cow Leather Gloves (Brown, 3X-Large)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B0B393C91W'),
('AZ9890-BRN-L', 'VIP Wears', 'J.A.G. Fingerless Motorcycle Gloves, Brown Real Leather Half Finger Driving Gloves for Men, Soft Half-Cut Cow Leather Gloves (Brown, Large)', 'hjgsdjhagshj', 'image url', 0.00, 34.00, 300.00, 'normal', 'black', 'B0B3933DB7'),
('AZ9890-BRN-M', 'VIP Wears', 'J.A.G. Fingerless Motorcycle Gloves, Brown Real Leather Half Finger Driving Gloves for Men, Soft Half-Cut Cow Leather Gloves (Brown, Medium)', 'hjgsdjhagshj', 'fdsa', 0.00, 34.00, 300.00, 'small', 'Red', 'B0B395B48N'),
('AZ9890-BRN-S', 'VIP Wears', 'J.A.G. Fingerless Motorcycle Gloves, Brown Real Leather Half Finger Driving Gloves for Men, Soft Half-Cut Cow Leather Gloves (Brown, Small)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B0B399WX9X'),
('AZ9890-BRN-XL', 'VIP Wears', 'J.A.G. Fingerless Motorcycle Gloves, Brown Real Leather Half Finger Driving Gloves for Men, Soft Half-Cut Cow Leather Gloves (Brown, X-Large)', 'hjgsdjhagshj', 'bdvdbuabb', 0.00, 34.00, 300.00, 'small', 'black', 'B0B396BC4Q'),
('AZ9890-BRN-XS', 'VIP Wears', 'J.A.G. Fingerless Motorcycle Gloves, Brown Real Leather Half Finger Driving Gloves for Men, Soft Half-Cut Cow Leather Gloves (Brown, X-Small)', 'hjgsdjhagshj', 'cxfvsf', 0.00, 34.00, 300.00, 'large', 'red', 'B0B393ZZ15');




INSERT INTO `return_items` (`r_id`, `email`, `SKU`, `barcode`, `title`, `warehouse`, `company`, `retail_price`, `quantity`, `discount_per`, `tax_per`, `date`, `time`) VALUES
(1, 'umaidkhakwani92@gmail.com', 'az7569-bk-l', 'b0bkl8rd9w', 'j.a.g. motorcycle gloves, leather perforated motorcycle gloves for men with knuckle protection, touchscreen motorbike gloves (black, large)', 'warehouse 1', 'VIP wears', '34', 40, 0, 0, '2023-11-23', '10:37:56'),
(2, 'umaidkhakwani92@gmail.com', 'az7569-m', 'b09x6w3v7x', 'j.a.g. jag motorcycle gloves, brown leather perforated motorcycle gloves for men with knuckle protection, touchscreen motorbike gloves (brown, medium)', 'warehouse 1', 'VIP wears', '34', 32, 0, 0, '2023-11-22', '23:08:06'),
(3, 'umaidkhakwani92@gmail.com', 'az7860-blk-l', 'b0b5l5m2xt', 'j.a.g. breathable all seasons mesh motorcycle riding shirt for men with ce (certified) protective padded shields (as1, alpha, l, regular, regular, black, large)', 'warehouse 1', 'VIP wears', '34', 32, 0, 0, '2023-11-22', '16:34:15'),
(4, 'umaidkhakwani92@gmail.com', 'az7569-xl', 'b09x6w251h', 'j.a.g. jag motorcycle gloves, brown leather perforated motorcycle gloves for men with knuckle protection, touchscreen motorbike gloves (brown, x-large)', 'warehouse 1', 'VIP wears', '34', 23, 0, 0, '2023-11-22', '02:09:40'),
(5, 'umaidkhakwani92@gmail.com', 'az7569-bk-xl', 'b0bkl7w312', 'j.a.g. motorcycle gloves, leather perforated motorcycle gloves for men with knuckle protection, touchscreen motorbike gloves (black, x-large)', 'warehouse 1', 'VIP wears', '34', 21, 0, 0, '2023-11-21', '17:28:31'),
(6, 'umaidkhakwani92@gmail.com', 'az9890-brn-m', 'b0b395b48n', 'j.a.g. fingerless motorcycle gloves, brown real leather half finger driving gloves for men, soft half-cut cow leather gloves (brown, medium)', 'warehouse 1', 'VIP wears', '34', 25, 0, 0, '2023-11-21', '14:46:01'),
(7, 'umaidkhakwani92@gmail.com', 'az7860-blk-xl', 'b0b5l52kgn', 'j.a.g. breathable all seasons mesh motorcycle riding shirt for men with ce (certified) protective padded shields (as1, alpha, x_l, regular, regular, black, x-large)', 'warehouse 1', 'VIP wears', '34', 40, 0, 0, '2023-11-21', '14:23:54'),
(8, 'umaidkhakwani92@gmail.com', 'az2652-red-m', 'b0b395mpvd', 'j.a.g. jag leather full finger driving gloves - cowhide driving motorcycle gloves for men and women (medium, red)', 'warehouse 1', 'VIP wears', '34', 55, 0, 0, '2023-11-21', '13:28:45'),
(9, 'umaidkhakwani92@gmail.com', 'az9890-brn-xl', 'b0b396bc4q', 'j.a.g. fingerless motorcycle gloves, brown real leather half finger driving gloves for men, soft half-cut cow leather gloves (brown, x-large)', 'warehouse 1', 'VIP wears', '34', 23, 0, 0, '2023-11-21', '10:31:12'),
(10, 'umaidkhakwani92@gmail.com', 'az9890-brn-l', 'b0b3933db7', 'j.a.g. fingerless motorcycle gloves, brown real leather half finger driving gloves for men, soft half-cut cow leather gloves (brown, large)', 'warehouse 1', 'VIP wears', '34', 38, 0, 0, '2023-11-20', '07:45:19'),
(11, 'umaidkhakwani92@gmail.com', 'az7569-bk-m', 'b0bklcbx4f', 'j.a.g. motorcycle gloves, leather perforated motorcycle gloves for men with knuckle protection, touchscreen motorbike gloves (black, medium)', 'warehouse 1', 'VIP wears', '34', 32, 0, 0, '2023-11-20', '02:00:34'),
(12, 'umaidkhakwani92@gmail.com', 'az7569-2xl', 'b09x6vhd8g', 'j.a.g. jag motorcycle gloves, brown leather perforated motorcycle gloves for men with knuckle protection, touchscreen motorbike gloves (brown, xx-large)', 'warehouse 1', 'VIP wears', '34', 28, 0, 0, '2023-11-19', '22:23:04'),
(13, 'umaidkhakwani92@gmail.com', 'az7860-blk-2xl', 'b0b5l2mxc3', 'j.a.g. breathable all seasons mesh motorcycle riding shirt for men with ce (certified) protective padded shields (as1, alpha, xx_l, regular, regular, black, 2x-large)', 'warehouse 1', 'VIP wears', '34', 30, 0, 0, '2023-11-19', '01:51:42'),
(14, 'umaidkhakwani92@gmail.com', 'az2652-red-l', 'b0b3946bz6', 'j.a.g. jag leather full finger driving gloves - cowhide driving motorcycle gloves for men and women (large, red)', 'warehouse 1', 'VIP wears', '34', 23, 0, 0, '2023-11-18', '09:22:43'),
(15, 'umaidkhakwani92@gmail.com', 'az9890-brn-s', 'b0b399wx9x', 'j.a.g. fingerless motorcycle gloves, brown real leather half finger driving gloves for men, soft half-cut cow leather gloves (brown, small)', 'warehouse 1', 'VIP wears', '34', 12, 0, 0, '2023-11-18', '08:51:28'),
(16, 'umaidkhakwani92@gmail.com', 'az-9972-bk-l', 'b0btmdjtgg', 'j.a.g. leather motorcycle motorbike knuckle protection powersports gloves - motorcycle gloves touchscreen for men (black/zip, large)', 'warehouse 1', 'VIP wears', '34', 24, 0, 0, '2023-11-17', '15:32:08'),
(17, 'umaidkhakwani92@gmail.com', 'az7569-bk-2xl', 'b0bklc4k5c', 'j.a.g. motorcycle gloves, leather perforated motorcycle gloves for men with knuckle protection, touchscreen motorbike gloves (black, xx-large)', 'warehouse 1', 'VIP wears', '34', 44, 0, 0, '2023-11-17', '14:00:42'),
(18, 'umaidkhakwani92@gmail.com', 'az9890-brn-2xl', 'b0b395b7mb', 'j.a.g. fingerless motorcycle gloves, brown real leather half finger driving gloves for men, soft half-cut cow leather gloves (brown, 2x-large)', 'warehouse 1', 'VIP wears', '34', 56, 0, 0, '2023-11-17', '12:22:06'),
(19, 'umaidkhakwani92@gmail.com', 'az7860-blk-s', 'b0b5l2ywr3', 'j.a.g. breathable all seasons mesh motorcycle riding shirt for men with ce (certified) protective padded shields (as1, alpha, s, regular, regular, black, small)', 'warehouse 1', 'VIP wears', '34', 33, 0, 0, '2023-11-17', '10:02:32'),
(20, 'umaidkhakwani92@gmail.com', 'az2652-red-xl', 'b0b3958m3y', 'j.a.g. jag leather full finger driving gloves - cowhide driving motorcycle gloves for men and women (x-large, red)', 'warehouse 1', 'VIP wears', '34', 34, 0, 0, '2023-11-17', '08:52:08'),
(21, 'umaidkhakwani92@gmail.com', 'az2652-red-2xl', 'b0b39434bz', 'j.a.g. jag leather full finger driving gloves - cowhide driving motorcycle gloves for men and women (2x-large, red)', 'warehouse 1', 'VIP wears', '34', 35, 0, 0, '2023-11-17', '05:46:37'),
(22, 'umaidkhakwani92@gmail.com', 'az7569-s', 'b09x6tthrx', 'j.a.g. jag motorcycle gloves, brown leather perforated motorcycle gloves for men with knuckle protection, touchscreen motorbike gloves (brown, small)', 'warehouse 1', 'VIP wears', '34', 21, 0, 0, '2023-11-16', '17:26:36'),
(23, 'umaidkhakwani92@gmail.com', 'az2652-red-xs', 'b0b3955d72', 'j.a.g. jag leather full finger driving gloves - cowhide driving motorcycle gloves for men and women (x-small, red)', 'warehouse 1', 'VIP wears', '34', 32, 0, 0, '2023-11-16', '14:33:02'),
(24, 'umaidkhakwani92@gmail.com', 'az7860-blk-m', 'b0b5l4g7vp', 'j.a.g. breathable all seasons mesh motorcycle riding shirt for men with ce (certified) protective padded shields (as1, alpha, m, regular, regular, black, medium)', 'warehouse 1', 'VIP wears', '34', 21, 0, 0, '2023-11-16', '04:51:13'),
(25, 'umaidkhakwani92@gmail.com', 'az-5523-bk-m', 'b0btt9fw1m', 'j.a.g. premium leather motorcycle motorbike gloves with knuckle protection - touchscreen motorcycle gloves for men - durable powersports gloves (black, medium)', 'warehouse 1', 'VIP wears', '34', 44, 0, 0, '2023-11-15', '23:54:13'),
(26, 'umaidkhakwani92@gmail.com', 'az2652-red-s', 'b0b393l8t4', 'j.a.g. jag leather full finger driving gloves - cowhide driving motorcycle gloves for men and women (small, red)', 'warehouse 1', 'VIP wears', '34', 65, 0, 0, '2023-11-15', '23:52:53'),
(27, 'umaidkhakwani92@gmail.com', 'az-3343-l', 'b0cg1hqtt4', 'j.a.g. premium leather motorcycle motorbike gloves with knuckle protection - touchscreen motorcycle gloves for men - durable powersports gloves (white, large)', 'warehouse 1', 'VIP wears', '34', 22, 0, 0, '2023-11-15', '22:09:03'),
(28, 'umaidkhakwani92@gmail.com', 'az7860-blk-3xl', 'b0b5l8bsjt', 'j.a.g. breathable all seasons mesh motorcycle riding shirt for men with ce (certified) protective padded shields (as1, alpha, 3x_l, regular, regular, black, 3x-large)', 'warehouse 1', 'VIP wears', '34', 34, 0, 0, '2023-11-15', '09:01:57'),
(29, 'umaidkhakwani92@gmail.com', 'az-9972-bk-m', 'b0btmb8bnd', 'j.a.g. leather motorcycle motorbike knuckle protection powersports gloves - motorcycle gloves touchscreen for men (black/zip, medium)', 'warehouse 1', 'VIP wears', '34', 32, 0, 0, '2023-11-15', '00:59:24'),
(30, 'umaidkhakwani92@gmail.com', 'az-5523-bk-l', 'b0bttbzfn1', 'j.a.g. premium leather motorcycle motorbike gloves with knuckle protection - touchscreen motorcycle gloves for men - durable powersports gloves (black, large)', 'warehouse 1', 'VIP wears', '34', 33, 0, 0, '2023-11-14', '20:02:19'),
(31, 'umaidkhakwani92@gmail.com', 'az-5524-bk-l', 'b0bttbjs7n', 'j.a.g. motorcycle gloves for men - genuine leather touchscreen motorbike glove for riding, road racing, cycling, motocross, hunting (black/white, large)', 'warehouse 1', 'VIP wears', '34', 22, 0, 0, '2023-11-13', '23:58:38'),
(32, 'umaidkhakwani92@gmail.com', 'az2652-red-3xl', 'b0b3934gb7', 'j.a.g. jag leather full finger driving gloves - cowhide driving motorcycle gloves for men and women (3x-large, red)', 'warehouse 1', 'VIP wears', '34', 11, 0, 0, '2023-11-13', '15:39:44'),
(33, 'umaidkhakwani92@gmail.com', 'az7860-blk-4xl', 'b0b5l39zsm', 'j.a.g. breathable all seasons mesh motorcycle riding shirt for men with ce (certified) protective padded shields (as1, alpha, 4x_l, regular, regular, black, 4x-large)', 'warehouse 1', 'VIP wears', '34', 44, 0, 0, '2023-11-13', '00:42:13'),
(34, 'umaidkhakwani92@gmail.com', 'az-2243-br-l', 'b0btm3bqqc', 'j.a.g. leather motorcycle motorbike knuckle protection powersports gloves - motorcycle gloves touchscreen for men (black brown, large)', 'warehouse 1', 'VIP wears', '34', 23, 0, 0, '2023-11-12', '07:41:42'),
(35, 'umaidkhakwani92@gmail.com', 'az9890-brn-3xl', 'b0b393c91w', 'j.a.g. fingerless motorcycle gloves, brown real leather half finger driving gloves for men, soft half-cut cow leather gloves (brown, 3x-large)', 'warehouse 1', 'VIP wears', '34', 32, 0, 0, '2023-11-12', '04:51:28'),
(36, 'umaidkhakwani92@gmail.com', 'az-7391-bk-l', 'b0btmbhb7h', 'j.a.g. jag leather motorcycle motorbike knuckle protection powersports gloves - motorcycle gloves touchscreen for men (all black, large)', 'warehouse 1', 'VIP wears', '34', 21, 0, 0, '2023-11-12', '02:58:14'),
(37, 'umaidkhakwani92@gmail.com', 'az7569-3xl', 'b09x6tfhpq', 'j.a.g. jag motorcycle gloves, brown leather perforated motorcycle gloves for men with knuckle protection, touchscreen motorbike gloves (brown, xxx-large)', 'warehouse 1', 'VIP wears', '34', 23, 0, 0, '2023-11-11', '07:54:24'),
(38, 'umaidkhakwani92@gmail.com', 'az6438-x', 'b09x9y9wyq', 'j.a.g. jag motorcycle gloves |red - leather motorcycle gloves - motorbike gloves - powersports - racing gloves - motorcycle gloves for men | motorcycle gloves touch screen� (red, x-large)', 'warehouse 1', 'VIP wears', '34', 24, 0, 0, '2023-11-11', '07:47:03'),
(39, 'umaidkhakwani92@gmail.com', 'az6438-m', 'b09xb126hg', 'j.a.g. jag motorcycle gloves |red - leather motorcycle gloves - motorbike gloves - powersports - racing gloves - motorcycle gloves for men | motorcycle gloves touch screen� (red, medium)', 'warehouse 1', 'VIP wears', '34', 45, 0, 0, '2023-11-10', '20:07:10'),
(40, 'umaidkhakwani92@gmail.com', 'az652-blk-l', 'b0b391vbn8', 'j.a.g. jag leather full finger driving gloves - cowhide driving motorcycle gloves for men and women (large, all black)', 'warehouse 1', 'VIP wears', '34', 11, 0, 0, '2023-11-10', '16:11:28'),
(41, 'umaidkhakwani92@gmail.com', 'az7569-bk-s', 'b0bklcbg81', 'j.a.g. motorcycle gloves, leather perforated motorcycle gloves for men with knuckle protection, touchscreen motorbike gloves (black, small)', 'warehouse 1', 'VIP wears', '34', 23, 0, 0, '2023-11-10', '10:53:59'),
(42, 'umaidkhakwani92@gmail.com', 'az-5524-bk-m', 'b0btt8kk1w', 'j.a.g. motorcycle gloves for men - genuine leather touchscreen motorbike glove for riding, road racing, cycling, motocross, hunting (black/white, medium)', 'warehouse 1', 'VIP wears', '34', 1, 0, 0, '2023-11-10', '01:25:44'),
(43, 'umaidkhakwani92@gmail.com', 'az-8887-bk-l', 'b0btmdhj8w', 'j.a.g. motorcycle gloves for men - genuine leather touchscreen motorbike glove for riding, road racing, cycling, motocross, hunting (black/red, large)', 'warehouse 1', 'VIP wears', '34', 23, 0, 0, '2023-11-09', '12:07:51'),
(44, 'umaidkhakwani92@gmail.com', 'az652-blu-m', 'b0b392343v', 'j.a.g. jjag leather full finger driving gloves - cowhide driving motorcycle gloves for men and women (medium, blue)', 'warehouse 1', 'VIP wears', '34', 34, 0, 0, '2023-11-08', '11:22:11'),
(45, 'umaidkhakwani92@gmail.com', 'az-9972-bk-xl', 'b0btmd3zdh', 'j.a.g. leather motorcycle motorbike knuckle protection powersports gloves - motorcycle gloves touchscreen for men (black/zip, x-large)', 'warehouse 1', 'VIP wears', '34', 23, 0, 0, '2023-11-08', '06:43:34'),
(46, 'umaidkhakwani92@gmail.com', 'az-5523-bk-s', 'b0btt95898', 'j.a.g. premium leather motorcycle motorbike gloves with knuckle protection - touchscreen motorcycle gloves for men - durable powersports gloves (black, small)', 'warehouse 1', 'VIP wears', '34', 21, 0, 0, '2023-11-08', '05:31:04'),
(47, 'umaidkhakwani92@gmail.com', 'az652-blu-l', 'b0b393s4jf', 'j.a.g. jag leather full finger driving gloves - cowhide driving motorcycle gloves for men and women (large, blue)', 'warehouse 1', 'VIP wears', '34', 12, 0, 0, '2023-11-07', '19:28:20'),
(48, 'umaidkhakwani92@gmail.com', 'az7569-bk-3xl', 'b0bkldlm37', 'j.a.g. motorcycle gloves, leather perforated motorcycle gloves for men with knuckle protection, touchscreen motorbike gloves (black, xxx-large)', 'warehouse 1', 'VIP wears', '34', 34, 0, 0, '2023-11-07', '18:32:31'),
(49, 'umaidkhakwani92@gmail.com', 'az-5523-bk-xl', 'b0btt4tshb', 'j.a.g. premium leather motorcycle motorbike gloves with knuckle protection - touchscreen motorcycle gloves for men - durable powersports gloves (black, x-large)', 'warehouse 1', 'VIP wears', '34', 23, 0, 0, '2023-11-07', '16:21:26'),
(50, 'umaidkhakwani92@gmail.com', 'az-5523-bk-3xl', 'b0btt8wmnr', 'j.a.g. premium leather motorcycle motorbike gloves with knuckle protection - touchscreen motorcycle gloves for men - durable powersports gloves (black, xxx-large)', 'warehouse 1', 'VIP wears', '34', 45, 0, 0, '2023-11-07', '13:25:21'),
(51, 'umaidkhakwani92@gmail.com', 'az-3343-m', 'b0cg1gsrtk', 'j.a.g. premium leather motorcycle motorbike gloves with knuckle protection - touchscreen motorcycle gloves for men - durable powersports gloves (white, medium)', 'warehouse 1', 'VIP wears', '34', 27, 0, 0, '2023-11-07', '11:36:12'),
(52, 'umaidkhakwani92@gmail.com', 'az-2243-br-xl', 'b0btm57ggq', 'j.a.g. leather motorcycle motorbike knuckle protection powersports gloves - motorcycle gloves touchscreen for men (black brown, x-large)', 'warehouse 1', 'VIP wears', '34', 25, 0, 0, '2023-11-06', '11:24:36'),
(53, 'umaidkhakwani92@gmail.com', 'az6438-2xl', 'b09x9yfjss', 'j.a.g. jag motorcycle gloves |red - leather motorcycle gloves - motorbike gloves - powersports - racing gloves - motorcycle gloves for men | motorcycle gloves touch screen� (red, xx-large)', 'warehouse 1', 'VIP wears', '34', 56, 0, 0, '2023-11-06', '09:13:12'),
(54, 'umaidkhakwani92@gmail.com', 'az652-blu-xl', 'b0b392kg3b', 'j.a.g. jag leather full finger driving gloves - cowhide driving motorcycle gloves for men and women (x-large, blue)', 'warehouse 1', 'VIP wears', '34', 65, 0, 0, '2023-11-06', '06:24:19'),
(55, 'umaidkhakwani92@gmail.com', 'az9890-brn-xs', 'b0b393zz15', 'j.a.g. fingerless motorcycle gloves, brown real leather half finger driving gloves for men, soft half-cut cow leather gloves (brown, x-small)', 'warehouse 1', 'VIP wears', '34', 34, 0, 0, '2023-11-06', '04:42:51'),
(56, 'umaidkhakwani92@gmail.com', 'az-7391-bk-xl', 'b0btmcd24z', 'j.a.g. jag leather motorcycle motorbike knuckle protection powersports gloves - motorcycle gloves touchscreen for men (all black, x-large)', 'warehouse 1', 'VIP wears', '34', 45, 0, 0, '2023-11-05', '10:09:45'),
(57, 'umaidkhakwani92@gmail.com', 'az-8887-bk-xl', 'b0btmdlqtn', 'j.a.g. motorcycle gloves for men - genuine leather touchscreen motorbike glove for riding, road racing, cycling, motocross, hunting (black/red, x-large)', 'warehouse 1', 'VIP wears', '34', 34, 0, 0, '2023-11-05', '07:33:18'),
(58, 'umaidkhakwani92@gmail.com', 'az-5524-bk-xl', 'b0bttb27br', 'j.a.g. motorcycle gloves for men - genuine leather touchscreen motorbike glove for riding, road racing, cycling, motocross, hunting (black/white, x-large)', 'warehouse 1', 'VIP wears', '34', 64, 0, 0, '2023-11-05', '03:13:46'),
(59, 'umaidkhakwani92@gmail.com', 'az652-blk-m', 'b0b391xl5r', 'j.a.g. jag leather full finger driving gloves - cowhide driving motorcycle gloves for men and women (medium, all black)', 'warehouse 1', 'VIP wears', '34', 45, 0, 0, '2023-11-04', '21:15:41'),
(60, 'umaidkhakwani92@gmail.com', 'az-2243-br-s', 'b0btm4211q', 'j.a.g. leather motorcycle motorbike knuckle protection powersports gloves - motorcycle gloves touchscreen for men (black brown, small)', 'warehouse 1', 'VIP wears', '34', 23, 0, 0, '2023-11-04', '19:44:25'),
(61, 'umaidkhakwani92@gmail.com', 'az-7391-bk-m', 'b0btmbpgq2', 'j.a.g. jag leather motorcycle motorbike knuckle protection powersports gloves - motorcycle gloves touchscreen for men (all black, medium)', 'warehouse 1', 'VIP wears', '34', 23, 0, 0, '2023-11-04', '17:24:42'),
(62, 'umaidkhakwani92@gmail.com', 'az-8887-bk-m', 'b0btmdctzq', 'j.a.g. motorcycle gloves for men - genuine leather touchscreen motorbike glove for riding, road racing, cycling, motocross, hunting (black/red, medium)', 'warehouse 1', 'VIP wears', '34', 34, 0, 0, '2023-11-04', '16:11:07'),
(63, 'umaidkhakwani92@gmail.com', 'az-3343-s', 'b0cg1g3cmq', 'j.a.g. premium leather motorcycle motorbike gloves with knuckle protection - touchscreen motorcycle gloves for men - durable powersports gloves (white, small)', 'warehouse 1', 'VIP wears', '34', 23, 0, 0, '2023-11-04', '09:39:39'),
(64, 'umaidkhakwani92@gmail.com', 'az7569-bk-xs', 'b0bkl8k56d', 'j.a.g. motorcycle gloves, leather perforated motorcycle gloves for men with knuckle protection, touchscreen motorbike gloves (black, x-small)', 'warehouse 1', 'VIP wears', '34', 2, 0, 0, '2023-11-04', '08:30:14'),
(65, 'umaidkhakwani92@gmail.com', 'az-9972-bk-2xl', 'b0btmbsz1w', 'j.a.g. leather motorcycle motorbike knuckle protection powersports gloves - motorcycle gloves touchscreen for men (black/zip, xx-large)', 'warehouse 1', 'VIP wears', '34', 37, 0, 0, '2023-11-04', '06:07:33'),
(66, 'umaidkhakwani92@gmail.com', 'az-9972-bk-xs', 'b0btmclft6', 'j.a.g. leather motorcycle motorbike knuckle protection powersports gloves - motorcycle gloves touchscreen for men (black/zip, x-small)', 'warehouse 1', 'VIP wears', '34', 42, 0, 0, '2023-11-03', '22:45:08'),
(67, 'umaidkhakwani92@gmail.com', 'az-5523-bk-xl', 'b0btt4tshb', 'j.a.g. premium leather motorcycle motorbike gloves with knuckle protection - touchscreen motorcycle gloves for men - durable powersports gloves (black, x-large)', 'warehouse 1', 'VIP wears', '34', 40, 0, 0, '2023-11-03', '19:29:37'),
(68, 'umaidkhakwani92@gmail.com', 'az-5523-bk-2xl', 'b0btt7x8wx', 'j.a.g. premium leather motorcycle motorbike gloves with knuckle protection - touchscreen motorcycle gloves for men - durable powersports gloves (black, xx-large)', 'warehouse 1', 'VIP wears', '34', 55, 0, 0, '2023-11-03', '15:17:49'),
(69, 'umaidkhakwani92@gmail.com', 'az7569-xs', 'b09x6vr75b', 'j.a.g. jag motorcycle gloves, brown leather perforated motorcycle gloves for men with knuckle protection, touchscreen motorbike gloves (brown, x-small)', 'warehouse 1', 'VIP wears', '34', 21, 0, 0, '2023-11-03', '12:10:25'),
(70, 'umaidkhakwani92@gmail.com', 'az6438-3xl', 'b09x9yhhdy', 'j.a.g. motorcycle gloves |red - leather motorcycle gloves - motorbike gloves - powersports - racing gloves - motorcycle gloves for men | motorcycle gloves touch screen� (red, xxx-large)', 'warehouse 1', 'VIP wears', '34', 22, 0, 0, '2023-11-03', '07:35:09'),
(71, 'umaidkhakwani92@gmail.com', 'az652-blk-xl', 'b0b3934z81', 'j.a.g. jag leather full finger driving gloves - cowhide driving motorcycle gloves for men and women(x-large, all black)', 'warehouse 1', 'VIP wears', '34', 2, 0, 0, '2023-11-02', '23:43:31'),
(72, 'umaidkhakwani92@gmail.com', 'az652-blk-s', 'b0b393r3xl', 'j.a.g. jag leather full finger driving gloves - cowhide driving motorcycle gloves for men and women (small, all black)', 'warehouse 1', 'VIP wears', '34', 32, 0, 0, '2023-11-02', '17:45:34'),
(73, 'umaidkhakwani92@gmail.com', 'az-8887-bk-xs', 'b0btm8tc94', 'j.a.g. motorcycle gloves for men - genuine leather touchscreen motorbike glove for riding, road racing, cycling, motocross, hunting (black/red, x-small)', 'warehouse 1', 'VIP wears', '34', 34, 0, 0, '2023-11-02', '05:31:03'),
(74, 'umaidkhakwani92@gmail.com', 'az-5524-bk-2xl', 'b0btt9612v', 'j.a.g. motorcycle gloves for men - genuine leather touchscreen motorbike glove for riding, road racing, cycling, motocross, hunting (black/white, xx-large)', 'warehouse 1', 'VIP wears', '34', 32, 0, 0, '2023-11-01', '22:36:50'),
(75, 'umaidkhakwani92@gmail.com', 'az652-blu-s', 'b0b393d9n8', 'j.a.g. jjag leather full finger driving gloves - cowhide driving motorcycle gloves for men and women (small, blue)', 'warehouse 1', 'VIP wears', '34', 11, 0, 0, '2023-10-31', '09:25:53'),
(76, 'umaidkhakwani92@gmail.com', 'az-2243-br-2xl', 'b0btm347yc', 'j.a.g. leather motorcycle motorbike knuckle protection powersports gloves - motorcycle gloves touchscreen for men (black brown, xx-large)', 'warehouse 1', 'VIP wears', '34', 22, 0, 0, '2023-10-30', '16:45:15'),
(77, 'umaidkhakwani92@gmail.com', 'az-2243-br-m', 'b0btm41mf1', 'j.a.g. leather motorcycle motorbike knuckle protection powersports gloves - motorcycle gloves touchscreen for men (black brown, medium)', 'warehouse 1', 'VIP wears', '34', 21, 0, 0, '2023-10-30', '16:43:16'),
(78, 'umaidkhakwani92@gmail.com', 'az-7391-bk-s', 'b0btm98cx8', 'j.a.g. jag leather motorcycle motorbike knuckle protection powersports gloves - motorcycle gloves touchscreen for men (all black, small)', 'warehouse 1', 'VIP wears', '34', 32, 0, 0, '2023-10-30', '13:51:54'),
(79, 'umaidkhakwani92@gmail.com', 'az-8887-bk-2xl', 'b0btmblls1', 'j.a.g. motorcycle gloves for men - genuine leather touchscreen motorbike glove for riding, road racing, cycling, motocross, hunting (black/red, xx-large)', 'warehouse 1', 'VIP wears', '34', 2, 0, 0, '2023-10-30', '06:37:03'),
(80, 'umaidkhakwani92@gmail.com', 'az-7391-bk-2xl', 'b0btmcwc5k', 'j.a.g. jag leather motorcycle motorbike knuckle protection powersports gloves - motorcycle gloves touchscreen for men (all black, xx-large)', 'warehouse 1', 'VIP wears', '34', 32, 0, 0, '2023-10-30', '05:09:00'),
(81, 'umaidkhakwani92@gmail.com', 'az-8887-bk-s', 'b0btmdf73p', 'j.a.g. motorcycle gloves for men - genuine leather touchscreen motorbike glove for riding, road racing, cycling, motocross, hunting (black/red, small)', 'warehouse 1', 'VIP wears', '34', 23, 0, 0, '2023-10-29', '20:30:57'),
(82, 'umaidkhakwani92@gmail.com', 'az-9972-bk-3xl', 'b0btmf18wc', 'j.a.g. leather motorcycle motorbike knuckle protection powersports gloves - motorcycle gloves touchscreen for men (black/zip, xxx-large)', 'warehouse 1', 'VIP wears', '34', 21, 0, 0, '2023-10-29', '20:30:03'),
(83, 'umaidkhakwani92@gmail.com', 'az-5523-bk-m', 'b0btt9fw1m', 'j.a.g. premium leather motorcycle motorbike gloves with knuckle protection - touchscreen motorcycle gloves for men - durable powersports gloves (black, medium)', 'warehouse 1', 'VIP wears', '34', 54, 0, 0, '2023-10-28', '21:43:59'),
(84, 'umaidkhakwani92@gmail.com', 'az652-blk-2xl', 'b0b391x4fg', 'j.a.g. jag leather full finger driving gloves - cowhide driving motorcycle gloves for men and women (2x-large, all black)', 'warehouse 1', 'VIP wears', '34', 43, 0, 0, '2023-10-28', '21:33:02'),
(85, 'umaidkhakwani92@gmail.com', 'az-7391-bk-3xl', 'b0btm9d1t3', 'j.a.g. leather motorcycle motorbike knuckle protection powersports gloves - motorcycle gloves touchscreen for men (all black, xxx-large)', 'warehouse 1', 'VIP wears', '34', 9, 0, 0, '2023-10-28', '15:16:42'),
(86, 'umaidkhakwani92@gmail.com', 'az-5524-bk-xs', 'b0btt84prw', 'j.a.g. motorcycle gloves for men - genuine leather touchscreen motorbike glove for riding, road racing, cycling, motocross, hunting (black/white, x-small)', 'warehouse 1', 'VIP wears', '34', 21, 0, 0, '2023-10-28', '13:31:13'),
(87, 'umaidkhakwani92@gmail.com', 'az-5523-bk-3xl', 'b0btt8wmnr', 'j.a.g. premium leather motorcycle motorbike gloves with knuckle protection - touchscreen motorcycle gloves for men - durable powersports gloves (black, xxx-large)', 'warehouse 1', 'VIP wears', '34', 54, 0, 0, '2023-10-28', '11:09:01'),
(88, 'umaidkhakwani92@gmail.com', 'az-5523-bk-s', 'b0btt95898', 'j.a.g. premium leather motorcycle motorbike gloves with knuckle protection - touchscreen motorcycle gloves for men - durable powersports gloves (black, small)', 'warehouse 1', 'VIP wears', '34', 44, 0, 0, '2023-10-28', '05:59:12'),
(89, 'umaidkhakwani92@gmail.com', 'az-3343-xxxl', 'b0cg1fxlcm', 'j.a.g. premium leather motorcycle motorbike gloves with knuckle protection - touchscreen motorcycle gloves for men - durable powersports gloves (white, xxx-large)', 'warehouse 1', 'VIP wears', '34', 33, 0, 0, '2023-10-27', '23:13:13'),
(90, 'umaidkhakwani92@gmail.com', 'az652-blu-2xl', 'b0b392g4cm', 'j.a.g. jag leather full finger driving gloves - cowhide driving motorcycle gloves for men and women (2x-large, blue)', 'warehouse 1', 'VIP wears', '34', 22, 0, 0, '2023-10-27', '11:10:38'),
(91, 'umaidkhakwani92@gmail.com', 'az652-blu-3xl', 'b0b392j7fz', 'j.a.g. jag leather full finger driving gloves - cowhide driving motorcycle gloves for men and women (3x-large, blue)', 'warehouse 1', 'VIP wears', '34', 11, 0, 0, '2023-10-27', '09:44:14'),
(92, 'umaidkhakwani92@gmail.com', 'az652-blk-3xl', 'b0b393fl7r', 'j.a.g. jag leather full finger driving gloves - cowhide driving motorcycle gloves for men and women (3x-large, all black)', 'warehouse 1', 'VIP wears', '34', 22, 0, 0, '2023-10-27', '05:42:11'),
(93, 'umaidkhakwani92@gmail.com', 'az652-blk-xs', 'b0b394tfb6', 'j.a.g. jag leather full finger driving gloves - cowhide driving motorcycle gloves for men and women (x-small, all black)', 'warehouse 1', 'VIP wears', '34', 66, 0, 0, '2023-10-26', '17:37:08'),
(94, 'umaidkhakwani92@gmail.com', 'az-9972-bk-s', 'b0btmbbk2r', 'j.a.g. leather motorcycle motorbike knuckle protection powersports gloves - motorcycle gloves touchscreen for men (black/zip, small)', 'warehouse 1', 'VIP wears', '34', 32, 0, 0, '2023-10-26', '17:19:40'),
(95, 'umaidkhakwani92@gmail.com', 'az-7391-bk-xs', 'b0btmbncs3', 'j.a.g. jag leather motorcycle motorbike knuckle protection powersports gloves - motorcycle gloves touchscreen for men (all black, x-small)', 'warehouse 1', 'VIP wears', '34', 44, 0, 0, '2023-10-26', '17:17:25'),
(96, 'umaidkhakwani92@gmail.com', 'az-5523-bk-2xl', 'b0btt7x8wx', 'j.a.g. premium leather motorcycle motorbike gloves with knuckle protection - touchscreen motorcycle gloves for men - durable powersports gloves (black, xx-large)', 'warehouse 1', 'VIP wears', '34', 34, 0, 0, '2023-10-26', '14:35:28'),
(97, 'umaidkhakwani92@gmail.com', 'az-5523-bk-xs', 'b0btt9ck6n', 'j.a.g. premium leather motorcycle motorbike gloves with knuckle protection - touchscreen motorcycle gloves for men - durable powersports gloves (black, x-small)', 'warehouse 1', 'VIP wears', '34', 34, 0, 0, '2023-10-26', '10:16:40'),
(98, 'umaidkhakwani92@gmail.com', 'az-3343-xxl', 'b0cg1ctzlm', 'j.a.g. premium leather motorcycle motorbike gloves with knuckle protection - touchscreen motorcycle gloves for men - durable powersports gloves (white, xx-large)', 'warehouse 1', 'VIP wears', '34', 66, 0, 0, '2023-10-26', '02:21:34'),
(99, 'umaidkhakwani92@gmail.com', 'az6438-l', 'b09x9y4l6m', 'j.a.g. jag motorcycle gloves |red - leather motorcycle gloves - motorbike gloves - powersports - racing gloves - motorcycle gloves for men | motorcycle gloves touch screen� (red, large)', 'warehouse 1', 'VIP wears', '34', 33, 0, 0, '2023-10-25', '23:04:20'),
(100, 'umaidkhakwani92@gmail.com', 'az652-blu-xs', 'b0b395mh6l', 'j.a.g. jag leather full finger driving gloves - cowhide driving motorcycle gloves for men and women (x-small, blue)', 'warehouse 1', 'VIP wears', '34', 23, 0, 0, '2023-10-25', '17:13:10'),
(101, 'umaidkhakwani92@gmail.com', 'az-2243-br-3xl', 'b0btm2pvh9', 'j.a.g. leather motorcycle motorbike knuckle protection powersports gloves - motorcycle gloves touchscreen for men (black brown, xxx-large)', 'warehouse 1', 'VIP wears', '34', 22, 0, 0, '2023-10-25', '13:38:55'),
(102, 'umaidkhakwani92@gmail.com', 'az-8887-bk-3xl', 'b0btmc8s2b', 'j.a.g. motorcycle gloves for men - genuine leather touchscreen motorbike glove for riding, road racing, cycling, motocross, hunting (black/red, xxx-large)', 'warehouse 1', 'VIP wears', '34', 45, 0, 0, '2023-10-25', '04:01:18'),
(103, 'umaidkhakwani92@gmail.com', 'az-5524-bk-3xl', 'b0btt7t2w2', 'j.a.g. motorcycle gloves for men - genuine leather touchscreen motorbike glove for riding, road racing, cycling, motocross, hunting (black/white, xxx-large)', 'warehouse 1', 'VIP wears', '34', 22, 0, 0, '2023-10-25', '02:05:56'),
(104, 'umaidkhakwani92@gmail.com', 'az-5523-bk-xs', 'b0btt9ck6n', 'j.a.g. premium leather motorcycle motorbike gloves with knuckle protection - touchscreen motorcycle gloves for men - durable powersports gloves (black, x-small)', 'warehouse 1', 'VIP wears', '34', 15, 0, 0, '2023-10-24', '18:49:05'),
(105, 'umaidkhakwani92@gmail.com', 'az-5523-bk-l', 'b0bttbzfn1', 'j.a.g. premium leather motorcycle motorbike gloves with knuckle protection - touchscreen motorcycle gloves for men - durable powersports gloves (black, large)', 'warehouse 1', 'VIP wears', '34', 14, 0, 0, '2023-10-24', '07:16:06'),
(106, 'umaidkhakwani92@gmail.com', 'az-5524-bk-s', 'b0btthllts', 'j.a.g. motorcycle gloves for men - genuine leather touchscreen motorbike glove for riding, road racing, cycling, motocross, hunting (black/white, small)', 'warehouse 1', 'VIP wears', '34', 56, 0, 0, '2023-10-24', '07:16:06'),
(107, 'umaidkhakwani92@gmail.com', 'az-3343-xs', 'b0cg1j52s1', 'j.a.g. premium leather motorcycle motorbike gloves with knuckle protection - touchscreen motorcycle gloves for men - durable powersports gloves (white, x-small)', 'warehouse 1', 'VIP wears', '34', 65, 0, 0, '2023-10-24', '02:51:55');


INSERT INTO `shopify_warehouse` (`sw_id`, `id`, `title`, `email`, `store_name`, `api_key`, `token_pass`, `company`, `date`, `time`) VALUES
(1, 2, 'Jag shopify', 'umaidkhakwani92@gmail.com', 'jagpowered', '1ad82ed2116c803c7f58f9667e7f72bb', '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', 'VIP wears', '2023-11-27', '23:43:53');



INSERT INTO `status` (`s_id`, `email`, `warehouse`, `company`, `totalCostPrice`, `totalDiscount`, `totalRetail`, `time`, `date`) VALUES
(1, 'umaidkhakwani92@gmail.com', 'warehouse 1', 'VIP wears', 0, 1, 68, '02:13:29', '2023-11-26'),
(2, 'umaidkhakwani92@gmail.com', 'warehouse 1', 'VIP wears', 0, 1, 68, '02:14:04', '2023-11-28'),
(3, 'umaidkhakwani92@gmail.com', 'warehouse 1', 'VIP wears', 0, 6, 340, '02:18:28', '2023-11-28');


INSERT INTO `warehouse_counter` (`id`, `email`, `warehouse`, `counter`) VALUES
(1, 'umaidkhakwani92@gmail.com', 'warehouse 1', 0),
(2, 'umaidkhakwani92@gmail.com', 'Jag shopify', 0);

