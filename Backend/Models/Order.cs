using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FinalProject.Models
{
    public class Order
    {
        [Key]
        public Guid OrderId { get; set; }
        [ForeignKey("ProductId")]
        public int ProductId {  get; set; }
        public string ProductName { get; set; }

        public int Quantity { get; set; }

        public Product Product { get; set; }

        public int UserId { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; }
        public int TotalAmount { get; set; }

        public DateTime DateTime { get; set; } = DateTime.Now;



    }
}
