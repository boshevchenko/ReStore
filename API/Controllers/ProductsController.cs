using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.RequestHelpers;
using API.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

    public class ProductsController : BaseApiController
    {
        private readonly StoreContext _context;
        private readonly IMapper _mapper;
        private readonly ImageService _imageService;

        public ProductsController(StoreContext context, IMapper mapper, ImageService imageService)
        {
            _context = context;
            _mapper = mapper;
            _imageService = imageService;
        }

        // [HttpGet]
        // public async Task<ActionResult<List<Product>>> GetProducts(string orderBy,
        // string searchTerm, string brands, string types)
        // {
        //     var query = _context.Products
        //     .Sort(orderBy)
        //     .Search(searchTerm)
        //     .Filter(brands, types)
        //     .AsQueryable();

        //     var products = await query.ToListAsync(); //await _context.Products.ToListAsync();
        //     return Ok(products);
        // }

        [HttpGet]
        public async Task<ActionResult<PagedList<Product>>> GetProducts([FromQuery] ProductParams productParams)
        {
            var query = _context.Products
            .Sort(productParams.OrderBy)
            .Search(productParams.SearchTerm)
            .Filter(productParams.Brands, productParams.Types)
            .AsQueryable();

            var products = await PagedList<Product>.ToPagedList(query,
            productParams.PageNumber, productParams.PageSize);

            // Response.Headers.Append("Pagination",
            // JsonSerializer.Serialize(products.MetaData));
            Response.AddPaginationHeader(products.MetaData);
            return products;
        }

        [HttpGet("{id}", Name = "GetProduct")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null) return NotFound();
            return product;
        }

        [HttpGet("filters")]
        public async Task<ActionResult> GetFilters()
        {
            var brands = await _context.Products.Select(b => b.Brand).Distinct().ToListAsync();
            var types = await _context.Products.Select(b => b.Type).Distinct().ToListAsync();
            return Ok(new { brands, types });
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<Product>> CreateProduct([FromForm] CreateProductDto productDto){
            var product = _mapper.Map<Product>(productDto);
            if (productDto.File != null) {
                var imageResult = await _imageService.AddImageAsync(productDto.File);
                if (imageResult.Error != null)
                return BadRequest(new ProblemDetails {Title = imageResult.Error.Message});
                product.PictureUrl = imageResult.SecureUrl.ToString();
                product.PublicId = imageResult.PublicId;
            }
            _context.Products.Add(product);
            var result = await _context.SaveChangesAsync() > 0;
            if (result) return CreatedAtRoute("GetProduct", new {id = product.Id}, product);
            return BadRequest(new ProblemDetails {Title = "Problem creating new product."});
        }

        [Authorize(Roles = "Admin")]
        [HttpPut]
        public async Task<ActionResult<Product>> UpdateProduct([FromForm] UpdateProductDto productDto){
            var product = await _context.Products.FindAsync(productDto.Id);
            if (product == null) return NotFound();
            if (productDto.File != null && !string.IsNullOrWhiteSpace(product.PublicId)) {
                var deletionResult = await _imageService.DeleteImageAsync(product.PublicId);
                if (deletionResult.Error != null)
                return BadRequest(new ProblemDetails {Title = deletionResult.Error.Message});
                product.PublicId = string.Empty;
                var imageResult = await _imageService.AddImageAsync(productDto.File);
                if (imageResult.Error != null)
                return BadRequest(new ProblemDetails {Title = imageResult.Error.Message});
                product.PictureUrl = imageResult.SecureUrl.ToString();
                product.PublicId = imageResult.PublicId;
            }
            _mapper.Map(productDto, product);
            var result = await _context.SaveChangesAsync() > 0;
            if (result) return product;
            return BadRequest(new ProblemDetails {Title = "Problem updating new product."});
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult<int>> DeleteProduct(int id){
            var product = await _context.Products.FindAsync(id);
            if (product == null) return NotFound();
            _context.Products.Remove(product);
            var result = await _context.SaveChangesAsync() > 0;
            if (result) return id;
            return BadRequest(new ProblemDetails {Title = "Problem deleting new product."});
        }
    }
}