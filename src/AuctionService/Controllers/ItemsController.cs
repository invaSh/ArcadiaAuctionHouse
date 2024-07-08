﻿using AuctionService.Data;
using AuctionService.DTOs.Auction;
using AuctionService.DTOs.Item;
using AuctionService.Models;
using AutoMapper;
using Contracts.Items;
using MassTransit;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AuctionService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemsController : ControllerBase
    {
        private readonly AuctionDbContext _context;
        private readonly IMapper _mapper;
        private readonly IPublishEndpoint _publishEndpoint;

        public ItemsController(AuctionDbContext context, IMapper mapper, IPublishEndpoint publishEndpoint)
        {
            _context = context;
            _mapper = mapper;
            _publishEndpoint = publishEndpoint;
        }

        [HttpGet]
        public async Task<ActionResult<List<ItemDto>>> GetAllItems()
        {
            var items = await _context.Items.ToListAsync();
            return _mapper.Map<List<ItemDto>>(items);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ItemDto>> GetItem(Guid id)
        {
            var item = await _context.Items.FirstOrDefaultAsync(x => x.Id == id);
            return _mapper.Map<ItemDto>(item);
        }

        [HttpPost]
        public async Task<ActionResult<ItemDto>> CreateItem(CreateItemDto itemDto)
        {
            var item = _mapper.Map<Item>(itemDto);

            _context.Items.Add(item);

            var newItem = _mapper.Map<ItemDto>(item);

            await _publishEndpoint.Publish(_mapper.Map<ItemCreated>(newItem));

            var result = await _context.SaveChangesAsync() > 0;

            if (!result) return BadRequest("Could not save changes");

            return CreatedAtAction(nameof(GetItem), new { item.Id }, newItem);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateItem(Guid id, UpdateItemDto itemDto)
        {
            var item = await _context.Items
                .FirstOrDefaultAsync(x => x.Id == id);

            if (item == null) return NotFound();

            item.Title = itemDto.Title;
            item.Description = itemDto.Description;
            item.Dimensions = itemDto.Dimensions;
            item.Materials = itemDto.Materials;  
            item.ConditionReport = itemDto.ConditionReport;
            item.ArtistOrMaker = itemDto.ArtistOrMaker;
            item.YearOfCreation = itemDto.YearOfCreation;
            item.ImageUrl = itemDto.ImageUrl;
            item.Provenance = itemDto.Provenance;
            item.Winner = itemDto.Winner;  
            item.SoldAmount = itemDto.SoldAmount; 
            item.CurrentHighBid = itemDto.CurrentHighBid;


            var res = await _context.SaveChangesAsync();

            if (res == 0) return BadRequest("Update not finished.");

            return Ok("Auction successfully updated");
        }

        //[HttpDelete("{id}")]
        //public async Task<ActionResult> DeleteItem(Guid id)
        //{

        //}

    }
}
