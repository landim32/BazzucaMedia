using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BazzucaMedia.Domain.Interfaces.Services
{
    public interface IS3Service
    {
        Task<byte[]> DownloadFile(string url);
        string GetImageUrl(string fileName);
        string InsertFromStream(Stream stream, string name);
    }
}
