export const getVideoData = (url: string) => {
    if (!url) return null;

    // YouTube
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
        const isShort = url.includes('/shorts/');
        const id = isShort
            ? url.split('/shorts/')[1]?.split('?')[0]
            : (url.split('v=')[1]?.split('&')[0] || url.split('/').pop());

        return {
            embedUrl: `https://www.youtube.com/embed/${id}${isShort ? '' : '?vq=hd1080'}`,
            isVertical: isShort
        };
    }

    // Vimeo
    if (url.includes('vimeo.com')) {
        const id = url.split('/').pop();
        return {
            embedUrl: `https://player.vimeo.com/video/${id}`,
            isVertical: false
        };
    }

    // TikTok
    if (url.includes('tiktok.com')) {
        const id = url.match(/\/video\/(\d+)/)?.[1];
        if (id) {
            return {
                embedUrl: `https://www.tiktok.com/embed/v2/${id}`,
                isVertical: true
            };
        }
    }

    // Instagram
    if (url.includes('instagram.com')) {
        const id = url.match(/\/(?:p|reels|reel)\/([A-Za-z0-9_-]+)/)?.[1];
        if (id) {
            return {
                embedUrl: `https://www.instagram.com/p/${id}/embed`,
                isVertical: url.includes('/reels/') || url.includes('/reel/')
            };
        }
    }

    return null;
};
