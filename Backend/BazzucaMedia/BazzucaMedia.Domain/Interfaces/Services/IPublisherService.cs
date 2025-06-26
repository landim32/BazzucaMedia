using BazzucaMedia.Domain.Interfaces.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BazzucaMedia.Domain.Interfaces.Services
{
    public interface IPublisherService
    {
        Task Publish(IPostModel post);
    }
}
