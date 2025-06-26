using BazzucaMedia.Domain.Interfaces.Models;
using BazzucaMedia.DTO.Post;
using BazzucaMedia.DTO.SocialNetwork;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BazzucaMedia.Domain.Interfaces.Services
{
    public interface IPostService
    {
        IEnumerable<IPostModel> ListByUser(long userId);
        IPostModel GetById(long postId);
        PostInfo GetPostInfo(IPostModel model);
        IPostModel Insert(PostInfo post);
        IPostModel Update(PostInfo post);
        Task<IPostModel> Publish(IPostModel post);
    }
}