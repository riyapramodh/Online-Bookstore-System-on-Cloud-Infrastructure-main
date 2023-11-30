import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function Home() {
  // const navigate = useNavigate();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    const result = await axios.get("http://localhost:8080/books");
    
    result.data.forEach((book) => (book.selected = true));
    setBooks(result.data);
  };

  const deleteBook = async (id) => {
    alert(`Delete book with ID ${id}`);
    await axios.delete(`http://localhost:8080/book/${id}`);
    loadBooks();

    // try{
    //   await axios.delete(`http://localhost:8080/book/${id}`);
    //   loadBooks();
    // }catch (error){
    //   console.error('Error deleting book:', error);
    // }

  };

  const printSummary = async () => {
    const selectedBooks = books.filter((book) => book.selected);
    const totalCost = selectedBooks.reduce(
      (total, book) => total + parseFloat(book.cost),
      0
    );

    try {
      const response = await axios.post(
        "https://us-central1-pivotal-nebula-401108.cloudfunctions.net/savesummary", // Replace with your Cloud Function URL
        {
          content: generateSummaryContent(selectedBooks, totalCost),
        }
      );

      console.log("Summary saved to Cloud Storage:", response.data);
      alert("Proceed to Pay");
    } catch (error) {
      console.error("Error saving summary:", error);
      alert("Failed to save summary to Cloud Storage");
    }
  };

  const generateSummaryContent = (selectedBooks, totalCost) => {
    // Generate the summary content here
    // You can use the same logic as in your printSummary function

    let summaryContent =
      "<html><head><title>Print Summary</title></head><body>";
    summaryContent += "<h1>Receipt</h1>";
    summaryContent +=
      "<h2>Thank you for purchasing, you may proceed to pay with this receipt</h2>";
    summaryContent += "<ul>";

    selectedBooks.forEach((book) => {
      summaryContent += `<li><h5>Title: ${book.title}, Cost: ${book.cost}</h5></li>`;
    });

    summaryContent += `<li><h4><u>Total Cost: ${totalCost.toFixed(2)}</u></h2></li></ul>`;
    summaryContent += "</ul></body></html>";

    return summaryContent;



    // const selectedBooks = books.filter((book) => book.selected);
    // const totalCost = selectedBooks.reduce((total, book) => total + parseFloat(book.cost), 0);

    // const printWindow = window.open("", "_blank");
    // printWindow.document.open();
    // printWindow.document.write(
    //   "<html><head><title>Print Summary</title></head><body>"
    // );

    // printWindow.document.write("<h1>Receipt</h1>");
    // printWindow.document.write("<h2>Thank you for purchasing, you may proceed to pay with this receipt</h2>");
    // printWindow.document.write("<ul>");

    // selectedBooks.forEach((book) => {
    //   printWindow.document.write(
    //     `<li><h5>Title: ${book.title}, Cost: ${book.cost}</h5></li>`
    //   );
    // });
    // printWindow.document.write(`<li><h4><u>Total Cost: ${totalCost.toFixed(2)}</u></h2></li></ul>`);

    // printWindow.document.write("</ul>");

    // printWindow.document.write("</body></html>");
    // printWindow.document.close();
    // printWindow.print();
    // printWindow.close();
  };

  return (
    <div className="container">
      <div className="py-4">
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Title</th>
              <th scope="col">Author</th>
              <th scope="col">Cost</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.cost}</td>
                <td>
                  <Link
                    className="btn btn-primary mx-2"
                    to={`/viewuser/${book.id}`}
                  >
                    View
                  </Link>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/edituser/${book.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteBook(book.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-center">
        <button
          type="button"
          onClick={printSummary}
          className="btn btn-primary"
        >
          Proceed to Pay
        </button>
      </div>
    </div>
  );
};




















