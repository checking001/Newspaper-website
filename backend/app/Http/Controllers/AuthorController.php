<?php

namespace App\Http\Controllers;

use App\Models\Author;
use Illuminate\Http\Request;

class AuthorController extends Controller
{
    public function index(Request $request)
    {
        $query = Author::withCount('articles');

        if ($request->has('search')) {
            $search = $request->search;
            $query->where('name', 'like', "%$search%")
                  ->orWhere('email', 'like', "%$search%");
        }

        $authors = $query->orderBy('name')->paginate(20);

        return response()->json($authors);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'bio' => 'nullable|string',
            'profile_image' => 'nullable|string',
            'designation' => 'nullable|string|max:255',
            'email' => 'nullable|email|unique:authors',
            'is_active' => 'boolean',
        ]);

        $author = Author::create([
            ...$validated,
            'slug' => \Str::slug($validated['name']),
        ]);

        return response()->json($author, 201);
    }

    public function show(Author $author)
    {
        return response()->json($author->load('articles'));
    }

    public function update(Request $request, Author $author)
    {
        $validated = $request->validate([
            'name' => 'string|max:255',
            'bio' => 'nullable|string',
            'profile_image' => 'nullable|string',
            'designation' => 'nullable|string|max:255',
            'email' => 'nullable|email|unique:authors,email,' . $author->id,
            'is_active' => 'boolean',
        ]);

        $author->update($validated);

        return response()->json($author);
    }

    public function destroy(Author $author)
    {
        if ($author->articles()->exists()) {
            return response()->json([
                'message' => 'Cannot delete author with articles'
            ], 400);
        }

        $author->delete();

        return response()->json(['message' => 'Author deleted']);
    }
}