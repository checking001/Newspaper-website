<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Illuminate\Http\Request;

class TagController extends Controller
{
    public function index(Request $request)
    {
        $query = Tag::withCount('articles');

        if ($request->has('search')) {
            $search = $request->search;
            $query->where('name', 'like', "%$search%");
        }

        $tags = $query->orderBy('name')->paginate(50);

        return response()->json($tags);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:tags',
        ]);

        $tag = Tag::create([
            'name' => $validated['name'],
            'slug' => \Str::slug($validated['name']),
        ]);

        return response()->json($tag, 201);
    }

    public function show(Tag $tag)
    {
        return response()->json($tag->load('articles'));
    }

    public function update(Request $request, Tag $tag)
    {
        $validated = $request->validate([
            'name' => 'string|max:255|unique:tags,name,' . $tag->id,
        ]);

        $tag->update([
            'name' => $validated['name'],
            'slug' => \Str::slug($validated['name']),
        ]);

        return response()->json($tag);
    }

    public function destroy(Tag $tag)
    {
        $tag->articles()->detach();
        $tag->delete();

        return response()->json(['message' => 'Tag deleted']);
    }
}