<?php

class News {
    function __construct($db) {
        $this->db = $db;
    }

    public function getBanners() {
        return $this->db->getBanners();
    }

    public function addBanner($title, $text, $image, $url) {
        return $this->db->addBanner($title, $text, $image, $url);
    }
    public function deleteBanner($id) {
        return $this->db->deleteBanner($id);
    }
    public function updateBanner($id, $hidden) {
        return $this->db->updateBanner($id, $hidden);
    }
    public function setBannerOrder($id, $priority) {
        return $this->db->setBannerOrder($id, $priority);
    }
    public function getNews() {
        return $this->db->getNews();
    }

    public function addNews($title, $text, $image) {
        return $this->db->addNews($title, $text, $image);
    }

    public function updateNews($id, $hidden) {
        return $this->db->updateNews($id, $hidden);
    }
}