<?php

namespace App\Http\Controllers;

use App\Models\Media;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class MediaController extends Controller
{
    public function index(Request $request)
    {
        $query = Media::with('uploadedBy');

        if ($request->has('mime_type')) {
            $query->where('mime_type', 'like', $request->mime_type . '%');
        }

        $media = $query->orderBy('created_at', 'desc')->paginate(20);

        return response()->json($media);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'file' => 'required|file|max:102400',
            'alt_text' => 'nullable|string|max:255',
            'caption' => 'nullable|string',
            'credit' => 'nullable|string|max:255',
        ]);

        $file = $request->file('file');
        $filename = Str::uuid() . '.' . $file->getClientOriginalExtension();
        
        // For demo: store in storage/app/public
        $path = $file->storeAs('uploads', $filename, 'public');

        $media = Media::create([
            'filename' => $filename,
            'original_filename' => $file->getClientOriginalName(),
            'mime_type' => $file->getMimeType(),
            'size' => $file->getSize(),
            'disk' => 'public',
            'url' => '/storage/' . $path,
            'alt_text' => $validated['alt_text'] ?? null,
            'caption' => $validated['caption'] ?? null,
            'credit' => $validated['credit'] ?? null,
            'uploaded_by' => $request->user()->id,
        ]);

        return response()->json($media, 201);
    }

    public function show(Media $media)
    {
        return response()->json($media->load('uploadedBy'));
    }

    public function update(Request $request, Media $media)
    {
        $validated = $request->validate([
            'alt_text' => 'nullable|string|max:255',
            'caption' => 'nullable|string',
            'credit' => 'nullable|string|max:255',
        ]);

        $media->update($validated);

        return response()->json($media);
    }

    public function destroy(Media $media)
    {
        // Delete file from storage
        \Storage::disk('public')->delete('uploads/' . $media->filename);
        $media->delete();

        return response()->json(['message' => 'Media deleted']);
    }
}