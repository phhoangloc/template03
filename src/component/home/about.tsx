import React from 'react'
import Page from './page'
type Props = {}

const About = (props: Props) => {
    return (
        <div className="home_archive">
            <Page archive="Giới thiệu về chúng tôi" detail={
                <p><br></br>
                    Cửa hàng đồng hồ X, chuyên kinh doanh trực tuyến và nhập khẩu đồng hồ từ Nhật Bản,
                    là điểm đến tuyệt vời cho những người yêu thích nghệ thuật và chất lượng của thế giới đồng hồ Nhật Bản.
                    Chúng tôi tự hào là đại diện cho sự tinh tế và sự chăm sóc đặc biệt
                    trong việc mang đến những chiếc đồng hồ vô cùng độc đáo và cao cấp.<br></br>
                    <br></br>
                    Với sứ mệnh đưa đến tay khách hàng những sản phẩm chất lượng nhất, cửa hàng chúng tôi tập trung vào việc nhập khẩu các thương hiệu đồng hồ danh tiếng từ xứ sở hoa anh đào. Từ những tên tuổi lâu dài đến những nhãn hiệu mới nổi, mỗi chiếc đồng hồ đều được chọn lựa kỹ lưỡng để đảm bảo vừa đáp ứng mong đợi về chất lượng, vừa thấp thoáng cái đẹp tinh tế.
                    <br></br>
                    <br></br>
                    Khách hàng khi mua sắm tại cửa hàng đồng hồ X không chỉ là những người chọn lựa sản phẩm, mà còn là những người trải nghiệm sự kết hợp giữa nghệ thuật và công nghệ cao cấp. Đồng hồ của chúng tôi không chỉ là thiết bị đo thời gian mà còn là biểu tượng của phong cách và đẳng cấp.
                    <br></br>
                    <br></br>
                    Chúng tôi cam kết đem đến trải nghiệm mua sắm trực tuyến thuận lợi nhất, với dịch vụ giao hàng nhanh chóng và chăm sóc khách hàng chuyên nghiệp. Hơn nữa, cùng với việc nhập khẩu trực tiếp, chúng tôi tự tin mang đến giá trị tốt nhất cho khách hàng, tạo nên không gian mua sắm trực tuyến thú vị và đáng tin cậy dành cho những người đam mê đồng hồ Nhật Bản và thế giới.
                </p>
            } />
        </div>
    )
}

export default About