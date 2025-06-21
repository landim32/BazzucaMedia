using BazzucaSocial.DTO.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace BazzucaSocial.DTO.Post
{
    public class PostResult: StatusResult
    {
        [JsonPropertyName("value")]
        public PostInfo Value { get; set; }
    }
}
