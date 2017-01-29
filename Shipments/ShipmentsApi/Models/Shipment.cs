using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShipmentsApi.Models
{
    public class Shipment
    {

        public int Id { get; set; }

        public string Origin { get; set; }

        public string Destination { get; set; }

        internal static List<Shipment> Create()
        {
            return new List<Shipment>
            {
                new Shipment
                {
                    Id = 1,
                    Origin = "Didcot",
                    Destination = "Witney"
                },
                new Shipment
                {
                    Id = 2,
                    Origin = "Newbury",
                    Destination = "Reading"
                }
            };
        }
    }
}