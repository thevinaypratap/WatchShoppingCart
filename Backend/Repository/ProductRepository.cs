using FinalProject.Models;
using FinalProject.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace FinalProject.Repository
{
    public class ProductRepository : IProduct
    {
        private readonly FinalDbContext context;

        public ProductRepository(FinalDbContext context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<Product>> GetAllProducts()
        {
            return await context.Products.ToListAsync();
        }
        public async Task<Product> GetProductById(int id)
        {
            return await context.Products.FirstOrDefaultAsync(t => t.ProductId == id);
        }
        public async Task<IEnumerable<Product>> GetProductsByCategoryId(int categoryId)
        {
            return await context.Products.Where(t => t.CategoryId == categoryId).ToListAsync();
        }
   
        public bool AddProduct(Product product)
        {
            var res = context.Categories.FirstOrDefault(c => c.CategoryId == product.CategoryId);
            if (product.CategoryId == 0 || res == null)
            {
                return false;
            }
            var result = context.Products.Add(product);
            context.SaveChanges();
            return true;
        }
        public async Task<Product> UpdateProduct(int id, Product product)
        {
            var result = await context.Products.FirstOrDefaultAsync(t => t.ProductId == id);
            if (result != null)
            {
                result.ProductName = product.ProductName;
                result.ProductDescription = product.ProductDescription;
                result.Price = product.Price;
                result.Stock = product.Stock;
           
                result.ImageURL = product.ImageURL;
                result.CategoryId = product.CategoryId;

                await context.SaveChangesAsync();
                return result;
            }
            return null;
        }

        public bool ProductExists(int id)
        {
            return context.Products.Any(t => t.ProductId == id);
        }

        public async Task<IEnumerable<Product>> SearchProduct(string productString)
        {
            var result = context.Products.Where(p => p.ProductName.Contains(productString) || p.ProductDescription.Contains(productString));
            if (result != null)
            {
                return result;
            }
            return null;
        }



        public async Task<Category> GetCategoriesByCategoryId(int categoryId)
        {
            return await context.Categories.FirstOrDefaultAsync(c => c.CategoryId == categoryId);
        }
        public async Task<List<Product>> ProductByCategory(int CategoryId)
        {
            string FilterByCategoryId = "exec ProductByCategory @Categoryid =" + CategoryId;
            return context.Products.FromSqlRaw(FilterByCategoryId).ToList();
        }

        public async Task<IEnumerable<Category>> GetAllCategories()
        {
            return await context.Categories.ToListAsync();
        }

        public async Task<Category> AddCategory(Category category)
        {
            var result = await context.Categories.AddAsync(category);
            await context.SaveChangesAsync();
            return result.Entity;
        }

        public async Task<Product> DeleteProduct(int id)
        {
            var res = await context.Products.FirstOrDefaultAsync(t => t.ProductId == id);
            if (res != null)
            {
                context.Products.Remove(res);
                await context.SaveChangesAsync();
                return res;
            }
            return null;
        }
        public async Task<List<Product>> GetExpiredProduct()
        {
            string FilterByExpiryDate = "exec GetExpiredProducts";
            return context.Products.FromSqlRaw(FilterByExpiryDate).ToList();



        }
        public async Task<List<Product>> GetExpiringProducts()
        {
            string FilterByExpiryDate = "exec GetExpiredProducts";
            return context.Products.FromSqlRaw(FilterByExpiryDate).ToList();



        }
        public async Task<Category> UpdateCategory(int id, Category category)
        {
            var result = await context.Categories.FirstOrDefaultAsync(t => t.CategoryId == id);
            if (result != null)
            {
                result.CategoryName = category.CategoryName;

                await context.SaveChangesAsync();
                return result;
            }
            return null;
        }

        public async Task<Category> DeleteCategory(int id)
        {
            var result = await context.Categories.FirstOrDefaultAsync(t => t.CategoryId == id);
            if (result != null)
            {
                context.Categories.Remove(result);
                await context.SaveChangesAsync();
                return result;
            }
            return null;
        }

        public bool CategoryExists(int id)
        {
            return context.Categories.Any(t => t.CategoryId == id);
        }
    }
}
