import React from 'react'
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card } from "antd";
import moment from 'moment';
import { Link } from 'react-router-dom';
const { Meta } = Card;
const ProductCard = ({ item }) => {
  // console.log(item);
  return (
    <Card
      style={{
        width: 300,
      }}
      cover={<img alt="example" src={item?.Image} />}
    >
      <Meta
        avatar={
          <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
        }
        title={<p>{item?.Title}</p>}
        description={item.Author}
      />
      <p className="text-gray-400 text-center ms-2 pb-4">
        Published: {moment(item.PublicationDate).format("Do MMM YYYY")}
      </p>
      <div className="flex justify-center items-center space-x-3">
        <Link to={`/details/${item._id}`} className="border-[1px] border-[#27DEC0] px-2  py-[1px] rounded-md hover:bg-[#27dec0dd] bg-[#27dec025] hover:text-black text-[13px]">
          Details
        </Link>
        <button className="border-[1px] border-[#27DEC0] px-2  py-[1px] rounded-md hover:bg-[#27dec0dd] bg-[#27dec025] hover:text-black text-[13px]">
          Add WishList
        </button>
      </div>
    </Card>
  );
}

export default ProductCard;