using BazzucaSocial.DTO.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace BazzucaSocial.DTO.SocialNetwork
{
    public class SocialNetworkListResult: StatusResult
    {
        [JsonPropertyName("values")]
        public IList<SocialNetworkInfo> Values { get; set; }
    }
}
