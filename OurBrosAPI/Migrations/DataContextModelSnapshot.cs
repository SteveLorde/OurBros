﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using OurBrosAPI.Data;

#nullable disable

namespace OurBrosAPI.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "7.0.9");

            modelBuilder.Entity("OurBrosAPI.Data.Models.Lobby", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<bool?>("islocked")
                        .HasColumnType("INTEGER");

                    b.Property<string>("lobbyname")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("lobbyowner")
                        .HasColumnType("TEXT");

                    b.Property<string>("lobbypassword")
                        .HasColumnType("TEXT");

                    b.Property<int?>("usercount")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.ToTable("Lobbies");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            islocked = true,
                            lobbyname = "Lobby1",
                            lobbypassword = "123456"
                        },
                        new
                        {
                            Id = 2,
                            islocked = true,
                            lobbyname = "Lobby2",
                            lobbypassword = "123456"
                        },
                        new
                        {
                            Id = 3,
                            islocked = false,
                            lobbyname = "lobby3"
                        });
                });

            modelBuilder.Entity("OurBrosAPI.Data.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("hashedpassword")
                        .HasColumnType("TEXT");

                    b.Property<string>("salt")
                        .HasColumnType("TEXT");

                    b.Property<string>("username")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("userpassword")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Users");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            username = "TestUser1",
                            userpassword = "1234"
                        },
                        new
                        {
                            Id = 2,
                            username = "TestUser2",
                            userpassword = "1234"
                        });
                });
#pragma warning restore 612, 618
        }
    }
}
