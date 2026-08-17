-- CreateTable
CREATE TABLE `Duck` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `color` ENUM('Red', 'Green', 'Yellow', 'Black') NOT NULL,
    `size` ENUM('XLarge', 'Large', 'Medium', 'Small', 'XSmall') NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `deleted` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Duck_deleted_quantity_idx`(`deleted`, `quantity`),
    INDEX `Duck_color_size_price_deleted_idx`(`color`, `size`, `price`, `deleted`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
