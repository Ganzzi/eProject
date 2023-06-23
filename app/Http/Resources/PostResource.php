<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * 
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray( $request)
    {
        return [
            'id' => $this->id,
            'creator' => $this->creator,
            
            'description' => $this->description,
            'comment' => $this->comment,
          
            'image' => $this->image,
           
            'updated_at' => $this->created_at->format('Y-m-d H:i:s'),
        ];
    }
}
