CREATE TABLE IF NOT EXISTS `courses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `categoryId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `briefContent` varchar(256) COLLATE utf8_unicode_ci NOT NULL,
  `detailedContent` varchar(2560) COLLATE utf8_unicode_ci NOT NULL,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`),
  FOREIGN KEY (`userId`) REFERENCES `users`(`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;