import React from "react";
import "./style.css";

export default function AboutUs() {
  return (
    <div className="huce-app">
      {/* Header */}
      {/* <header className="header">
        <div className="container header-main">
          <img src="https://ext.same-assets.com/762766977/4078745154.png" alt="Logo HUCE" className="logo" />
          <div className="header-title">
            <h1>TRƯỜNG ĐẠI HỌC XÂY DỰNG HÀ NỘI</h1>
            <h2>Hanoi University of Civil Engineering</h2>
          </div>
        </div>
      </header> */}
      {/* Content Section */}
      <main className="main-content container">
        <h1 className="title">Cơ sở vật chất</h1>
        <section className="description">
          <p>Tại Hà Nội, trường có tổng diện tích hơn 3.9ha, trong đó có các khu giảng đường lớn như nhà H1 (6 tầng), H2 (4 tầng), nhà H3 (7 tầng + 2 tầng hầm), nhà Thư viện (4 tầng) và nhà Thí nghiệm (10 tầng), Trung tâm thể thao 1403 m2, Hội trường G3 (900 chỗ); Khu làm việc nhà A1 (6 tầng), nhà A2 (2 tầng) và Ký túc xá sinh viên 8012,22 m2/1000 giường. Hiện nay, trường đang đầu tư xây dựng cơ sở đào tạo thực nghiệm tại Khu đô thị Hà Nam Cao - thành phố Phủ Lý - tỉnh Hà Nam với diện tích trên 24ha. Năm 2022, Trường đã đưa vào sử dụng tòa nhà giảng đường (2 tầng nổi), ký túc xá (5095,78m2/500 giường), sân thực hành (diện tích sân 5024m2) cùng với hệ thống hạ tầng kỹ thuật đồng bộ tại cơ sở Hà Nam.</p>
        </section>
        {/* Hình ảnh trường */}
        <div className="image-gallery">
          <img src="https://ext.same-assets.com/762766977/2819520306.jpeg" alt="Toàn cảnh trường 1" />
          <img src="https://ext.same-assets.com/762766977/4054370725.jpeg" alt="Toàn cảnh trường 2" />
          <img src="https://ext.same-assets.com/762766977/2883134574.jpeg" alt="Trường HUCE cơ sở Hà Nội" />
          <img src="https://ext.same-assets.com/762766977/3152681233.jpeg" alt="Trường HUCE cơ sở 3 Hà Nam" />
          <img src="https://ext.same-assets.com/762766977/2510479059.jpeg" alt="HUCE ảnh 5" />
          <img src="https://ext.same-assets.com/762766977/2360864810.jpeg" alt="HUCE ảnh 6" />
        </div>
        <div className="caption">Trường Đại học Xây dựng Hà Nội - Cơ sở Đào tạo thực nghiệm tại Hà Nam</div>
        <section className="areas">
          <h3>Giảng đường, phòng thực hành, phòng thí nghiệm và nghiên cứu</h3>
          <ul>
            <li>Tổng diện tích giảng đường, phòng thực hành: 45.787,94 m2</li>
            <li>Tổng diện tích phòng thí nghiệm và nghiên cứu: 10.911,26 m2</li>
          </ul>
        </section>
        <section className="library">
          <h3>Thư viện và trung tâm học liệu</h3>
          <p>Tổng diện tích: 7.107,35 m2, trong đó:</p>
          <ul>
            <li>Phòng Tự học - tầng 2: 350 chỗ</li>
            <li>Phòng đọc mở: 200 chỗ</li>
            <li>Phòng Internet: 40 chỗ</li>
            <li>Phòng đa phương tiện: 30 chỗ</li>
            <li>Phòng học nghiên cứu sinh và giảng viên: 30 chỗ</li>
            <li>Phòng Giáo trình: 100 chỗ</li>
          </ul>
        </section>
        <section className="book">
          <h3>Giáo trình, tài liệu</h3>
          <ul>
            <li>Phòng Giáo trình: 118.878 cuốn</li>
            <li>Phòng đọc mở (Tiếng Việt + Ngoại văn): 58.790 tài liệu</li>
          </ul>
        </section>
      </main>
      {/* Footer */}
      <footer className="footer">
        <div className="container footer-content">
          <div className="footer-logo">
            <img src="https://ext.same-assets.com/762766977/4078745154.png" alt="Logo HUCE" />
          </div>
          <div className="footer-info">
            <div>Địa chỉ: Số 55 Giải Phóng, Hai Bà Trưng, Hà Nội</div>
            <div>Điện thoại: (024) 38 696 397</div>
            <div>Email: dhxaydung@huce.edu.vn</div>
            <div>Fax: 024.38.691.684</div>
          </div>
          <div className="footer-social">
            <a href="https://www.facebook.com/truongdhxaydung" target="_blank" rel="noopener noreferrer"><img src="https://ext.same-assets.com/762766977/2210628482.png" alt="Facebook" /></a>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer"><img src="https://ext.same-assets.com/762766977/3870705302.png" alt="Twitter" /></a>
            <a href="https://www.youtube.com/channel/UCzsYk_GlL5IYG6wVUkyO_pQ/videos" target="_blank" rel="noopener noreferrer"><img src="https://ext.same-assets.com/762766977/791752300.png" alt="YouTube" /></a>
          </div>
        </div>
        <div className="footer-copyright">
          2021, HANOI UNIVERSITY OF CIVIL ENGINEERING. All rights reserved
        </div>
      </footer>
    </div>
  );
}
