<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Concerns\FilterEmailValidation;
use Illuminate\Validation\Rules\Password;

class SignupRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:55',
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email', 'regex:/\w{1,}@\w{1,}\.\w{2,5}/i'],
            'password' => [
                'required',
                'confirmed',
                Password::min(8)->letters()
            ]
        ];
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            if ($this->input('password') !== $this->input('password_confirmation')) {
                $validator->errors()->add('password_confirmation', 'Wrong password confirmation');
            }
        });
    }

    public function response(array $errors)
    {
        return response()->json(['success' => false, 'message' => 'Invalid data', 'errors' => $errors], 422);
    }
}
