import { DailymotionApiResponse, DailymotionVideo } from '../types/dailymotion';

/**
 * Utility class for handling Dailymotion API operations
 */
export class DailymotionApiUtil {
    private static readonly BASE_URL = 'https://api.dailymotion.com/videos';
    private static readonly DEFAULT_FIELDS = 'id,title,channel,thumbnail_480_url,url,owner.screenname,views_total,duration';
    private static readonly DEFAULT_LIMIT = 36;

    public static readonly CHANNEL_WORDS = [
        'Spotlight',
        'Picks',
        'Essentials',
        'Briefs',
        'Latest',
        'Now'
    ];

    private static channelWordIndex = 0;

    /**
     * Fetches trending videos from Dailymotion API
     * @param options Optional parameters to customize the request
     * @returns Promise<DailymotionApiResponse>
     */
    public static async fetchTrendingVideos(options?: {
        limit?: number;
        fields?: string;
        sort?: string;
    }): Promise<DailymotionApiResponse> {
        const params = new URLSearchParams({
            'sort': options?.sort || 'trending',
            'fields': options?.fields || this.DEFAULT_FIELDS,
            'limit': String(options?.limit || this.DEFAULT_LIMIT)
        });

        const requestUrl = `${this.BASE_URL}?${params.toString()}`;

        try {
            const response = await fetch(requestUrl, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                const errorBody = await response.text();
                throw new Error(
                    `Dailymotion API Error: ${response.status} ${response.statusText}\n` +
                    `URL: ${requestUrl}\n` +
                    `Response: ${errorBody}`
                );
            }

            const data = await response.json();
            return this.validateAndTransformResponse(data);
        } catch (error) {
            console.error('Error fetching Dailymotion videos:', error);
            throw error;
        }
    }

    /**
     * Validates and transforms the API response to ensure it matches our expected structure
     * @param data Raw API response data
     * @returns Transformed and validated DailymotionApiResponse
     */
    private static validateAndTransformResponse(data: any): DailymotionApiResponse {
        // Basic validation
        if (!data || typeof data !== 'object') {
            throw new Error('Invalid API response: Response is not an object');
        }

        if (!Array.isArray(data.list)) {
            throw new Error('Invalid API response: Missing or invalid video list');
        }

        // Transform the response to ensure consistent structure
        const transformedResponse: DailymotionApiResponse = {
            page: Number(data.page) || 1,
            limit: Number(data.limit) || this.DEFAULT_LIMIT,
            explicit: Boolean(data.explicit),
            total: Number(data.total) || 0,
            has_more: Boolean(data.has_more),
            list: data.list.map((video: any) => this.transformVideo(video))
        };

        return transformedResponse;
    }

    /**
     * Transforms a single video object to ensure consistent structure
     * @param video Raw video data from API
     * @returns Transformed DailymotionVideo
     */
    private static transformVideo(video: any): DailymotionVideo {
        const channel = String(video.channel || '');
        const specialWord = this.CHANNEL_WORDS[this.channelWordIndex];
        this.channelWordIndex = (this.channelWordIndex + 1) % this.CHANNEL_WORDS.length;
        
        return {
            id: String(video.id || ''),
            title: String(video.title || ''),
            channel: `${channel} - ${specialWord}`,
            thumbnail_480_url: String(video.thumbnail_480_url || ''),
            url: String(video.url || ''),
            'owner.screenname': video['owner.screenname'] || video.owner_screenname || '',
            views_total: Number(video.views_total) || 0,
            duration: Number(video.duration) || 0,
            ...video // Preserve any additional fields
        };
    }

    /**
     * Formats video duration from seconds to MM:SS format
     * @param duration Duration in seconds
     * @returns Formatted duration string
     */
    public static formatDuration(duration: number): string {
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    /**
     * Formats view count to a human-readable format
     * @param views Number of views
     * @returns Formatted view count string
     */
    public static formatViews(views: number): string {
        if (views >= 1000000) {
            return `${(views / 1000000).toFixed(1)}M`;
        }
        if (views >= 1000) {
            return `${(views / 1000).toFixed(1)}K`;
        }
        return views.toString();
    }
} 