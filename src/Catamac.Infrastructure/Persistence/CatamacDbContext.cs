using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Catamac.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Catamac.Infrastructure.Persistence
{
    public class CatamacDbContext : DbContext
    {
        public CatamacDbContext(DbContextOptions<CatamacDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users => Set<User>();
        public DbSet<Client> Clients => Set<Client>();
        public DbSet<Invoice> Invoices => Set<Invoice>();
        public DbSet<InvoiceLineItem> InvoiceLineItems => Set<InvoiceLineItem>();
        public DbSet<Product> Products => Set<Product>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // User entity configuration
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Username).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Email).IsRequired().HasMaxLength(255);
                entity.Property(e => e.PasswordHashed).IsRequired().HasMaxLength(255);

                entity.Property(e => e.CreatedAt).IsRequired();

                entity.HasIndex(e => e.Email).IsUnique();
            });

            // Client entity configuration
            modelBuilder.Entity<Client>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Name).IsRequired().HasMaxLength(200);
                entity.Property(e => e.Abn).IsRequired().HasMaxLength(50);
                entity.Property(e => e.Phone).IsRequired().HasMaxLength(50);

                entity.HasIndex(e => e.Abn).IsUnique();


                entity.HasMany(e => e.Invoices)
                .WithOne(e => e.Client)
                .HasForeignKey(e => e.ClientId)
                .OnDelete(DeleteBehavior.Restrict);

            });

            // Product entity configuration
            modelBuilder.Entity<Product>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Name).IsRequired().HasMaxLength(200);
                entity.Property(e => e.Sku).IsRequired().HasMaxLength(100);
                entity.Property(e => e.UnitPrice).IsRequired().HasPrecision(18,2);

                entity.HasIndex(e => e.Sku).IsUnique();

            });

            // Invoice entity configuration
            modelBuilder.Entity<Invoice>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.InvoiceCode).IsRequired().HasMaxLength(200);
                entity.Property(e => e.InvoiceDate).IsRequired();
                entity.Property(e => e.TotalAmount).IsRequired().HasPrecision(18,2);

                entity.HasIndex(e => e.InvoiceCode).IsUnique();

                entity.HasMany(e => e.InvoiceLineItems)
                .WithOne(e => e.Invoice)
                .HasForeignKey(e => e.InvoiceId)
                .OnDelete(DeleteBehavior.Cascade);
            });

            // InvoiceLineItem entity configuration
            modelBuilder.Entity<InvoiceLineItem>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Quantity).IsRequired();
                entity.Property(e => e.UnitPrice).IsRequired().HasPrecision(18,2);

                entity.Property(e => e.ProductNameSnapshot).IsRequired().HasMaxLength(200);
                entity.Property(e => e.ProductSkuSnapshot).IsRequired().HasMaxLength(100);

                entity.HasOne(e => e.Product)
                .WithMany(e => e.InvoiceLineItems)
                .HasForeignKey(e => e.ProductId)
                .OnDelete(DeleteBehavior.Restrict);
            });


        }


    }
}
