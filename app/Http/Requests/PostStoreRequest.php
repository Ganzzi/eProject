<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PostStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        if(request()->isMethod('post')){
        return [
           'description'=>'required|string|max:258',
           'image'=> 'required|image|mimes:jpeg,png,jpg|max:2048'

            
        ];
    }
    else{
        return[
            'description'=>'required|string',
            'image'=>'nullable|image|
            mimes:jpeg,png,jpg|max:2048'
            ]
            ;
        }
    }

public function messages(){
    if(request()->isMethod('post')){
        return[
            'description.required'=>'Description.required!',
            'image.required'=>'Image is required!'
        ];
    }
    else{
        return[
            'description.required'=>'Description.required!'
        ];
    }
}

}