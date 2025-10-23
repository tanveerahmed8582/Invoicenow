import "./ItemList.css";
import { jsPDF } from "jspdf";

const ItemList = ({ items, onEdit, onDelete }) => {
  const grandtotal = items.reduce((acc, curr) => acc + curr.total, 0);

  const handleDownloadPDF = () => {
    if (items.length === 0) {
      alert("No items to generate PDF!");
      return;
    }

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Invoice Bill", 14, 20); // Title

    doc.setFontSize(12);
    let y = 40;

    // Table header
    doc.text("Item Name", 14, y);
    doc.text("Rate", 70, y);
    doc.text("Quantity", 110, y);
    doc.text("Total", 160, y);
    y += 10;

    // Table rows
    items.forEach((item, index) => {
      doc.text(`${index + 1}. ${item.itemName}`, 14, y);
      doc.text(String(item.rate), 70, y);
      doc.text(String(item.quantity), 110, y);
      doc.text(String(item.total), 160, y);
      y += 10;
    });

    // Grand total
    y += 10;
    doc.setFontSize(14);
    doc.text(`Grand Total: ₹${grandtotal}`, 14, y);

    // Save the PDF
    doc.save("InvoiceNow.pdf");
  };

  return (
    <div className="itemlist">
      <h3>Items List</h3>
      {items.length === 0 ? (
        <p className="para">No Items added yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Rate</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.itemName}</td>
                  <td>{item.rate}</td>
                  <td>{item.quantity}</td>
                  <td>{item.total}</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => {
                        onEdit(index);
                      }}
                    >
                      Update
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => {
                        onDelete(index);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      <div className="total-section">
        <h3>
          Grandtotal: <span>${grandtotal}</span>
        </h3>
      </div>
      <div className="pdf-section">
        <button className="pdf-btn" onClick={handleDownloadPDF}>
          PDF generator
        </button>
      </div>
    </div>
  );
};

export default ItemList;
