<?php
class DB {
    private $pdo;

    function __construct() {
        // MySQL
        $host = '127.0.0.1';
        $port = '3306';
        $user = 'root';
        $pass = '';
        $db = 'webjek';
        $connect = "mysql:host=$host;port=$port;dbname=$db;charset=utf8";
        $this->pdo = new PDO($connect, $user, $pass);

        // Установите режим ошибок PDO на исключения
        $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    public function __destruct() {
        $this->pdo = null;
    }

    // Выполнить запрос без возвращения данных
    private function execute($sql, $params = []) {
        $sth = $this->pdo->prepare($sql);
        return $sth->execute($params);
    }

    // Получение ОДНОЙ записи
    private function query($sql, $params = []) {
        $sth = $this->pdo->prepare($sql);
        $sth->execute($params);
        return $sth->fetch(PDO::FETCH_OBJ);
    }

    // Получение НЕСКОЛЬКИХ записей
    private function queryAll($sql, $params = []) {
        $sth = $this->pdo->prepare($sql);
        $sth->execute($params);
        return $sth->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getUserByLogin($login) {
        return $this->query("SELECT * FROM users WHERE login=?", [$login]);
    }

    public function getUserByToken($token) {
        return $this->query("SELECT * FROM users WHERE token=?", [$token]);
    }

    public function updateToken($userId, $token) {
        $this->execute("UPDATE users SET token=? WHERE id=?", [$token, $userId]);
    }

    public function registration($login, $password, $name, $role) {
        $this->execute("INSERT INTO users (login, password, name, role) VALUES (?, ?, ?, ?)", [$login, $password, $name, $role]);
    }

    public function getMaps() {
        return $this->queryAll("SELECT * FROM maps");
    }

    public function addMap($streetName, $coordinates, $houses) {
        $this->execute("INSERT INTO maps (street_name, coordinates, houses) VALUES (?, ?, ?)", [$streetName, json_encode($coordinates), json_encode($houses)]);
    }
    public function getBanners() {
        return $this->queryAll("SELECT * FROM banners");
    }
    
    public function addBanner($title, $text, $image, $url) {
        return $this->execute("INSERT INTO banners (title, text, image, url) VALUES (?, ?, ?, ?)", [$title, $text, $image, $url]);
    }
    public function deleteBanner($id) {
        return $this->execute("DELETE FROM banners WHERE id=?", [$id]);
    }
    public function updateBanner($id, $hidden) {
        return $this->execute("UPDATE banners SET hidden=? WHERE id=?", [$hidden, $id]);
    }
    public function setBannerOrder($id, $priority) {
        return $this->execute("UPDATE banners SET priority=? WHERE id=?", [$priority, $id]);
    }
    public function getNews() {
        return $this->queryAll("SELECT * FROM news ORDER BY date DESC");
    }
    
    public function addNews($title, $text, $image) {
        return $this->execute("INSERT INTO news (title, text, image) VALUES (?, ?, ?)", [$title, $text, $image]);
    }

    public function updateNews($id, $hidden) {
        return $this->execute("UPDATE news SET hidden=? WHERE id=?", [$hidden, $id]);
    }
    
}
