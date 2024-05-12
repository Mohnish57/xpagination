import React, { useEffect, useState } from "react";
import "./EmployeeTable.css";

const API_END_POINT =
  "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

const EmployeeTable = () => {
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageIndex, setPageIndex] = useState({ start: 0, end: 10 });

  //   console.log(pageIndex.start);

  const fetchData = async () => {
    const response = await fetch(API_END_POINT);
    const result = await response.json();
    setData(result);
  };

  const handlePrevious = () => {
    if (pageIndex.end > 10) {
      setPageIndex((prev) => ({ start: prev.start - 10, end: prev.end - 10 }));
      setPageNumber((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (pageIndex.end < data.length) {
      setPageIndex((prev) => ({ start: prev.start + 10, end: prev.end + 10 }));
      setPageNumber((prev) => prev + 1);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //   console.log(data);
  return (
    <>
      <div className="employee-section">
        <h1>Employee Data Table</h1>
        <table className="employee-table">
          <thead>
            <tr>
              <td>ID</td>
              <td>Name</td>
              <td>Email</td>
              <td>Role</td>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              if (index >= pageIndex.start && index < pageIndex.end) {
                return (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.role}</td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
        <button onClick={handlePrevious}>Previous</button>
        <button>{pageNumber}</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </>
  );
};

export default EmployeeTable;
