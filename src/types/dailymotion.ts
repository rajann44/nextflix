/**
 * Represents the structure of an owner object within a Dailymotion video.
 */
export interface DailymotionVideoOwner {
    screenname: string;
    // Add other owner fields if needed, e.g., id, url
}

/**
 * Represents the structure of a single video object from the Dailymotion API.
 */
export interface DailymotionVideo {
    id: string;
    title: string;
    channel: string; // Represents the category slug, e.g., "news", "sport"
    thumbnail_480_url: string;
    url: string;
    
    // Handling 'owner.screenname':
    'owner.screenname'?: string; // If returned literally with a dot
    owner_screenname?: string; // If API converts dot to underscore

    views_total: number;
    duration: number; // Duration in seconds
    [key: string]: any; // Allow for other properties not explicitly defined
}

/**
 * Represents the overall structure of the JSON response from the Dailymotion API's /videos endpoint.
 */
export interface DailymotionApiResponse {
    page: number;
    limit: number;
    explicit: boolean;
    total: number;
    has_more: boolean;
    list: DailymotionVideo[];
} 