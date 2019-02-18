import { Table } from "antd";
import styled from "styled-components";

const BoardCompoent = ({ data }) => {
  const columns = [
    {
      title: "Ranking",
      dataIndex: "",
      width: "100px",
      render: (text, record, index) => {
        return <TextCenter>{index + 1}</TextCenter>;
      }
    },
    {
      title: "Name",
      dataIndex: "user"
    },
    {
      title: "WIN",
      dataIndex: "win"
    },
    {
      title: "LOSE",
      dataIndex: "lose"
    },
    {
      title: "DRAW",
      dataIndex: "draw"
    }
  ];

  return (
    <TableWhite
      rowKey="user"
      columns={columns}
      dataSource={data}
      pagination={false}
    />
  );
};
export default BoardCompoent;

const TableWhite = styled(Table)`
  background: white;
`;

const TextCenter = styled.div`
  text-align: center;
`;
